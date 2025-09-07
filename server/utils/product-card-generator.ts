import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { ProductBarcodeData } from './barcode';

interface ProductCardOptions {
  productData: ProductBarcodeData;
  productImagePath?: string;
  backgroundStyle?: 'luxury-gold' | 'elegant-marble' | 'premium-gradient' | 'royal-velvet';
}

export async function generateStunningProductCard(options: ProductCardOptions): Promise<string> {
  const { productData, productImagePath, backgroundStyle = 'luxury-gold' } = options;

  try {
    // Create uploads directory for product cards
    const uploadsDir = path.join(process.cwd(), 'uploads', 'product-cards');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Create beautiful background based on style
    const background = await createStunningBackground(backgroundStyle);

    // Card dimensions (optimized for mobile and web viewing)
    const cardWidth = 800;
    const cardHeight = 1200;

    // Create the main card background
    const cardBackground = await sharp({
      create: {
        width: cardWidth,
        height: cardHeight,
        channels: 3,
        background: { r: 248, g: 244, b: 240 } // Warm cream background
      }
    }).png();

    // Add luxury gradient overlay
    const gradientOverlay = await createLuxuryGradient(cardWidth, cardHeight, backgroundStyle);

    // Generate company header with golden styling
    const headerSvg = `
      <svg width="${cardWidth}" height="120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#b8860b;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#ffd700;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#goldGradient)" opacity="0.1"/>
        <text x="50%" y="40" text-anchor="middle" font-family="serif" font-size="28" font-weight="bold" fill="url(#goldGradient)" filter="url(#glow)">PALANIAPPA JEWELLERS</text>
        <text x="50%" y="70" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="600" fill="#8B7355" letter-spacing="3px">ESTD 2025 • LUXURY CRAFTSMANSHIP</text>
        <line x1="200" y1="85" x2="600" y2="85" stroke="url(#goldGradient)" stroke-width="2" opacity="0.6"/>
      </svg>
    `;

    // Generate elegant product details section
    const detailsSvg = await createProductDetailsSection(productData, cardWidth);

    // Generate beautiful footer
    const footerSvg = `
      <svg width="${cardWidth}" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#ffd700;stop-opacity:0.8" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#footerGradient)" rx="20"/>
        <text x="50%" y="30" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="white">📞 +91 994 206 1393</text>
        <text x="50%" y="50" text-anchor="middle" font-family="sans-serif" font-size="14" fill="white">💎 Visit us for exclusive collections</text>
        <text x="50%" y="75" text-anchor="middle" font-family="sans-serif" font-size="12" fill="white" opacity="0.9">Scan QR • View • Share • Authentic Jewelry</text>
      </svg>
    `;

    // Start building the composite image
    let compositeImage = cardBackground.composite([
      { input: await sharp(Buffer.from(gradientOverlay)).png().toBuffer(), top: 0, left: 0 }
    ]);

    // Add header
    compositeImage = compositeImage.composite([
      { input: Buffer.from(headerSvg), top: 40, left: 0 }
    ]);

    // Add product image if provided
    if (productImagePath && fs.existsSync(productImagePath)) {
      const productImageBuffer = await sharp(productImagePath)
        .resize(300, 300, { 
          fit: 'contain', 
          background: { r: 255, g: 255, b: 255, alpha: 0 } 
        })
        .png()
        .toBuffer();

      // Add elegant frame around product image
      const framedProductImage = await addElegantFrame(productImageBuffer, 300, 300);

      compositeImage = compositeImage.composite([
        { input: framedProductImage, top: 180, left: (cardWidth - 300) / 2 }
      ]);
    }

    // Add product details
    compositeImage = compositeImage.composite([
      { input: Buffer.from(detailsSvg), top: 520, left: 0 }
    ]);

    // Add footer
    compositeImage = compositeImage.composite([
      { input: Buffer.from(footerSvg), top: cardHeight - 140, left: 40 }
    ]);

    // Generate filename and save
    const filename = `product-card-${productData.productCode.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.png`;
    const outputPath = path.join(uploadsDir, filename);

    await compositeImage
      .png({ quality: 95 })
      .toFile(outputPath);

    return `/uploads/product-cards/${filename}`;

  } catch (error) {
    console.error('Error generating stunning product card:', error);
    throw new Error('Failed to generate product card');
  }
}

async function createStunningBackground(style: string): Promise<Buffer> {
  const width = 800;
  const height = 1200;
  
  let backgroundSvg = '';
  
  switch (style) {
    case 'luxury-gold':
      backgroundSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="luxuryGold" cx="50%" cy="30%" r="70%">
              <stop offset="0%" style="stop-color:#fff8e1;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#f9f5f0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#f3e5ab;stop-opacity:1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#luxuryGold)"/>
          <circle cx="200" cy="300" r="150" fill="rgba(255,215,0,0.1)"/>
          <circle cx="600" cy="800" r="200" fill="rgba(218,165,32,0.1)"/>
        </svg>
      `;
      break;
    case 'elegant-marble':
      backgroundSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="marble" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f8f8ff;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#f0f0f0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#e8e8e8;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#marble)"/>
        </svg>
      `;
      break;
    default:
      backgroundSvg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f8f4f0"/>
        </svg>
      `;
  }
  
  return Buffer.from(backgroundSvg);
}

async function createLuxuryGradient(width: number, height: number, style: string): Promise<string> {
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="luxuryOverlay" cx="50%" cy="20%" r="80%">
          <stop offset="0%" style="stop-color:rgba(255,215,0,0.05);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(0,0,0,0.02);stop-opacity:1" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#luxuryOverlay)"/>
    </svg>
  `;
}

async function createProductDetailsSection(productData: ProductBarcodeData, cardWidth: number): Promise<string> {
  const centerX = cardWidth / 2;
  
  return `
    <svg width="${cardWidth}" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="detailsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#6B5B47;stop-opacity:1" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Elegant background panel -->
      <rect x="40" y="20" width="${cardWidth - 80}" height="460" fill="rgba(255,255,255,0.9)" rx="20" stroke="rgba(218,165,32,0.3)" stroke-width="2"/>
      
      <!-- Product Name -->
      <text x="${centerX}" y="70" text-anchor="middle" font-family="serif" font-size="24" font-weight="bold" fill="url(#detailsGradient)" filter="url(#softGlow)">${productData.productName}</text>
      
      <!-- Product Code -->
      <rect x="${centerX - 100}" y="90" width="200" height="30" fill="rgba(218,165,32,0.2)" rx="15"/>
      <text x="${centerX}" y="110" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#8B7355">${productData.productCode}</text>
      
      <!-- Details Grid -->
      <g font-family="sans-serif" font-size="16" fill="#4A4A4A">
        <!-- Left Column -->
        <text x="80" y="160" font-weight="bold" fill="#8B7355">💎 PURITY</text>
        <text x="80" y="185" font-size="18" font-weight="600" fill="#2D2D2D">${productData.purity}</text>
        
        <text x="80" y="220" font-weight="bold" fill="#8B7355">⚖️ GROSS WEIGHT</text>
        <text x="80" y="245" font-size="18" font-weight="600" fill="#2D2D2D">${productData.grossWeight}</text>
        
        <text x="80" y="280" font-weight="bold" fill="#8B7355">📊 NET WEIGHT</text>
        <text x="80" y="305" font-size="18" font-weight="600" fill="#2D2D2D">${productData.netWeight}</text>
        
        <!-- Right Column -->
        <text x="420" y="160" font-weight="bold" fill="#8B7355">💎 STONES</text>
        <text x="420" y="185" font-size="16" fill="#2D2D2D">${productData.stones}</text>
        
        <text x="420" y="220" font-weight="bold" fill="#8B7355">📈 GOLD RATE</text>
        <text x="420" y="245" font-size="18" font-weight="600" fill="#2D2D2D">${productData.goldRate}</text>
        
        <text x="420" y="280" font-weight="bold" fill="#8B7355">💰 APPROX PRICE</text>
        <text x="420" y="305" font-size="20" font-weight="bold" fill="#D4AF37">${productData.approxPrice}</text>
      </g>
      
      <!-- Decorative elements -->
      <line x1="80" y1="340" x2="${cardWidth - 80}" y2="340" stroke="rgba(218,165,32,0.5)" stroke-width="1"/>
      <circle cx="120" cy="380" r="8" fill="rgba(218,165,32,0.3)"/>
      <circle cx="${centerX}" cy="380" r="8" fill="rgba(218,165,32,0.5)"/>
      <circle cx="${cardWidth - 120}" cy="380" r="8" fill="rgba(218,165,32,0.3)"/>
      
      <text x="${centerX}" y="420" text-anchor="middle" font-family="serif" font-size="14" font-style="italic" fill="#8B7355" opacity="0.8">Crafted with Precision • Designed for Elegance</text>
    </svg>
  `;
}

async function addElegantFrame(imageBuffer: Buffer, width: number, height: number): Promise<Buffer> {
  const frameWidth = width + 20;
  const frameHeight = height + 20;
  
  const frameSvg = `
    <svg width="${frameWidth}" height="${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:#ffd700;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#b8860b;stop-opacity:0.8" />
        </linearGradient>
        <filter id="frameGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#frameGradient)" rx="15" filter="url(#frameGlow)"/>
      <rect x="10" y="10" width="${width}" height="${height}" fill="white" rx="10" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
    </svg>
  `;

  const frameBuffer = Buffer.from(frameSvg);
  
  return sharp({
    create: {
      width: frameWidth,
      height: frameHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: frameBuffer, top: 0, left: 0 },
    { input: imageBuffer, top: 10, left: 10 }
  ])
  .png()
  .toBuffer();
}

// Function to generate a standalone HTML page (alternative approach)
export async function generateStandaloneProductPage(productData: ProductBarcodeData, productImagePath?: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'uploads', 'product-pages');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productData.productName} - Palaniappa Jewellers</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Arial', sans-serif; 
            background: linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%);
            min-height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center;
            padding: 20px;
        }
        .product-card { 
            max-width: 500px; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            overflow: hidden;
            border: 2px solid rgba(218,165,32,0.3);
        }
        .header { 
            background: linear-gradient(135deg, #d4af37, #ffd700); 
            color: white; 
            text-align: center; 
            padding: 30px 20px;
        }
        .header h1 { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
        .header p { font-size: 12px; opacity: 0.9; letter-spacing: 2px; }
        .product-image { 
            text-align: center; 
            padding: 30px;
            background: linear-gradient(45deg, rgba(255,215,0,0.05), rgba(255,255,255,0.95));
        }
        .product-image img { 
            max-width: 250px; 
            max-height: 250px; 
            border-radius: 15px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .details { padding: 30px; }
        .product-name { 
            font-size: 22px; 
            font-weight: bold; 
            color: #8B7355; 
            text-align: center; 
            margin-bottom: 20px;
        }
        .product-code { 
            text-align: center; 
            background: rgba(218,165,32,0.2); 
            padding: 8px 16px; 
            border-radius: 20px; 
            margin-bottom: 25px; 
            font-weight: bold;
            color: #8B7355;
        }
        .detail-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 15px; 
            margin-bottom: 25px;
        }
        .detail-item { text-align: center; }
        .detail-label { 
            font-size: 12px; 
            color: #8B7355; 
            font-weight: bold; 
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        .detail-value { 
            font-size: 16px; 
            font-weight: 600; 
            color: #2D2D2D;
        }
        .price { 
            text-align: center; 
            font-size: 24px; 
            font-weight: bold; 
            color: #D4AF37; 
            margin: 20px 0;
        }
        .footer { 
            background: linear-gradient(135deg, #8B7355, #6B5B47); 
            color: white; 
            text-align: center; 
            padding: 20px;
        }
        .contact { font-size: 16px; font-weight: bold; margin-bottom: 5px; }
        .tagline { font-size: 12px; opacity: 0.9; }
        @media (max-width: 600px) {
            .product-card { margin: 10px; }
            .detail-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="product-card">
        <div class="header">
            <h1>PALANIAPPA JEWELLERS</h1>
            <p>ESTD 2025 • LUXURY CRAFTSMANSHIP</p>
        </div>
        
        ${productImagePath ? `
        <div class="product-image">
            <img src="${productImagePath}" alt="${productData.productName}">
        </div>
        ` : ''}
        
        <div class="details">
            <div class="product-name">${productData.productName}</div>
            <div class="product-code">${productData.productCode}</div>
            
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">💎 Purity</div>
                    <div class="detail-value">${productData.purity}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">⚖️ Gross Weight</div>
                    <div class="detail-value">${productData.grossWeight}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">📊 Net Weight</div>
                    <div class="detail-value">${productData.netWeight}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">💎 Stones</div>
                    <div class="detail-value">${productData.stones}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">📈 Gold Rate</div>
                    <div class="detail-value">${productData.goldRate}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">💰 Approx Price</div>
                    <div class="detail-value price">${productData.approxPrice}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="contact">📞 +91 994 206 1393</div>
            <div class="tagline">Crafted with Precision • Designed for Elegance</div>
        </div>
    </div>
</body>
</html>
  `;

  const filename = `product-${productData.productCode.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.html`;
  const outputPath = path.join(uploadsDir, filename);
  
  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  
  return `/uploads/product-pages/${filename}`;
}