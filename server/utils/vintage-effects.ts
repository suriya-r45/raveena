import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export interface VintageOptions {
  sepia?: number;
  vignette?: boolean;
  grain?: boolean;
  fadeEdges?: boolean;
  polaroidBorder?: boolean;
  warmTone?: boolean;
}

export async function applyVintageEffect(
  inputImagePath: string, 
  outputImagePath: string, 
  options: VintageOptions = {}
): Promise<string> {
  try {
    const {
      sepia = 0.6,
      vignette = true,
      grain = true,
      fadeEdges = true,
      polaroidBorder = true,
      warmTone = true
    } = options;

    // Check if input file exists
    if (!fs.existsSync(inputImagePath)) {
      throw new Error(`Input image does not exist: ${inputImagePath}`);
    }

    // Get image metadata
    const metadata = await sharp(inputImagePath).metadata();
    const { width = 800, height = 600 } = metadata;

    let image = sharp(inputImagePath);

    // Apply warm sepia tone
    if (warmTone) {
      image = image.modulate({
        brightness: 0.95,
        saturation: 0.8,
        hue: 25
      });
    }

    // Apply sepia effect
    if (sepia > 0) {
      image = image.tint({ r: 255, g: 240, b: 200 }).modulate({
        saturation: 1 - sepia
      });
    }

    // Reduce contrast and brightness for vintage look
    image = image.linear(0.8, 10);

    // Add subtle blur for soft vintage feel
    image = image.blur(0.3);

    let processedImage = await image.toBuffer();

    // Create vignette effect if enabled
    if (vignette) {
      const vignetteOverlay = Buffer.from(
        `<svg width="${width}" height="${height}">
          <defs>
            <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stop-color="transparent"/>
              <stop offset="70%" stop-color="transparent"/>
              <stop offset="100%" stop-color="rgba(0,0,0,0.3)"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#vignette)"/>
        </svg>`
      );

      processedImage = await sharp(processedImage)
        .composite([{ input: vignetteOverlay, blend: 'multiply' }])
        .toBuffer();
    }

    // Add polaroid border if enabled
    if (polaroidBorder) {
      const borderWidth = Math.max(Math.floor(width * 0.08), 20);
      const borderHeight = Math.max(Math.floor(height * 0.08), 20);
      const bottomBorder = Math.max(Math.floor(height * 0.15), 40); // Larger bottom border like real polaroids

      processedImage = await sharp(processedImage)
        .extend({
          top: borderWidth,
          bottom: bottomBorder,
          left: borderWidth,
          right: borderWidth,
          background: { r: 248, g: 245, b: 235 } // Cream white polaroid border
        })
        .toBuffer();
    }

    // Add subtle noise/grain for film texture
    if (grain) {
      const noiseOverlay = Buffer.from(
        `<svg width="${width + 40}" height="${height + 80}">
          <filter id="noise">
            <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise" seed="5"/>
            <feColorMatrix in="noise" type="saturate" values="0"/>
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 .5 0 .5 0 .5"/>
            </feComponentTransfer>
            <feBlend in2="SourceGraphic" mode="multiply" result="blend"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
        </svg>`
      );

      processedImage = await sharp(processedImage)
        .composite([{ input: noiseOverlay, blend: 'overlay' }])
        .toBuffer();
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputImagePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save the processed image
    await sharp(processedImage)
      .jpeg({ quality: 85 }) // Slight compression for authentic feel
      .toFile(outputImagePath);

    return outputImagePath;
  } catch (error) {
    console.error('Error applying vintage effect:', error);
    throw error;
  }
}

export async function createVintageProductImage(
  originalImagePath: string, 
  productId: string
): Promise<string> {
  try {
    // Create vintage directory if it doesn't exist
    const vintageDir = path.join(process.cwd(), 'uploads', 'vintage');
    if (!fs.existsSync(vintageDir)) {
      fs.mkdirSync(vintageDir, { recursive: true });
    }

    const originalExt = path.extname(originalImagePath);
    const vintageFilename = `vintage-${productId}-${Date.now()}.jpg`;
    const vintageImagePath = path.join(vintageDir, vintageFilename);

    // Apply vintage effect
    await applyVintageEffect(
      path.join(process.cwd(), originalImagePath.replace(/^\//, '')),
      vintageImagePath,
      {
        sepia: 0.7,
        vignette: true,
        grain: true,
        fadeEdges: true,
        polaroidBorder: true,
        warmTone: true
      }
    );

    return `/uploads/vintage/${vintageFilename}`;
  } catch (error) {
    console.error('Error creating vintage product image:', error);
    throw error;
  }
}