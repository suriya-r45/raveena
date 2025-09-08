import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { db } from '../db.js';
import { products } from '../../shared/schema.js';
import { sql } from 'drizzle-orm';
import { generateStunningProductCard, generateStandaloneProductPage } from './product-card-generator.js';

export interface ProductBarcodeData {
  productCode: string;
  productName: string;
  purity: string;
  grossWeight: string;
  netWeight: string;
  stones: string;
  goldRate: string;
  approxPrice: string;
}

export async function generateProductCode(category: string, subCategory?: string, year: number = new Date().getFullYear()): Promise<string> {
  // Get category and subcategory abbreviations
  const categoryAbbreviation = getCategoryAbbreviation(category);
  const subCategoryAbbreviation = getSubCategoryAbbreviation(category, subCategory);
  
  // Optimized query: Get only the maximum sequence number using SQL MAX function
  let maxSequence = 0;
  try {
    const result = await db.select({ 
      maxCode: sql<number>`MAX(CAST(SUBSTRING(product_code FROM LENGTH(product_code) - 2) AS INTEGER))`
    }).from(products).where(sql`product_code ~ '^PJ-.*-[0-9]{3}$'`);
    
    maxSequence = result[0]?.maxCode || 0;
  } catch (error) {
    // Fallback to simple count if regex query fails
    const count = await db.select({ count: sql<number>`count(*)` }).from(products);
    maxSequence = count[0]?.count || 0;
  }
  const sequentialNumber = String(maxSequence + 1).padStart(3, '0');
  
  return `PJ-${categoryAbbreviation}-${subCategoryAbbreviation}-${year}-${sequentialNumber}`;
}

function getCategoryAbbreviation(category: string): string {
  const categoryMappings: { [key: string]: string } = {
    // Main categories
    'rings': 'RN',
    'necklaces': 'NK', 
    'earrings': 'ER',
    'bracelets': 'BR',
    'bangles': 'BG',
    'pendants': 'PD',
    'mangalsutra': 'MS',
    'mangalsutra & thali chains': 'MS',
    'nose jewellery': 'NJ',
    'anklets & toe rings': 'AN',
    'brooches & pins': 'BP',
    'kids jewellery': 'KJ',
    'bridal & special collections': 'SC',
    'shop by material / gemstone': 'MT',
    'material': 'MT',
    'gemstone': 'MT'
  };
  
  return categoryMappings[category.toLowerCase()] || 'GN'; // GN for General
}

function getSubCategoryAbbreviation(category: string, subCategory?: string): string {
  if (!subCategory) return 'GN';
  
  const categoryKey = category.toLowerCase();
  const subCategoryKey = subCategory.toLowerCase();
  
  // Comprehensive subcategory mappings
  const subCategoryMappings: { [category: string]: { [subCategory: string]: string } } = {
    'rings': {
      'engagement rings': 'ENG',
      'engagement_rings': 'ENG',
      'wedding bands': 'WB',
      'wedding_bands': 'WB',
      'couple rings': 'CR',
      'couple_rings': 'CR',
      'cocktail party rings': 'CPR',
      'cocktail_party_rings': 'CPR',
      'daily wear rings': 'DWR',
      'daily_wear_rings': 'DWR',
      'mens rings': 'MR',
      'mens_rings': 'MR'
    },
    'necklaces': {
      'chains': 'CHN',
      'chokers': 'CH',
      'lockets': 'LK',
      'beaded necklaces': 'BD',
      'beaded_necklaces': 'BD',
      'collars': 'COL',
      'long necklaces opera chains': 'LON',
      'long_necklaces_opera_chains': 'LON',
      'multi layered necklaces': 'MLN',
      'multi_layered_necklaces': 'MLN'
    },
    'earrings': {
      'studs': 'ST',
      'hoops': 'HP',
      'drops danglers': 'DR',
      'drops_danglers': 'DR',
      'chandbalis': 'CHB',
      'jhumkas': 'JK',
      'ear cuffs': 'EC',
      'ear_cuffs': 'EC',
      'kids earrings': 'KER',
      'kids_earrings': 'KER'
    },
    'bracelets': {
      'cuff': 'CF',
      'tennis': 'TN',
      'charm': 'CM',
      'chain': 'CHN',
      'beaded': 'BD',
      'link': 'LK',
      'bolo': 'BL',
      'leather': 'LTH',
      'diamond': 'DM',
      'gemstone': 'GS',
      'pearl': 'PRL',
      'bridal': 'BDL',
      'minimalist': 'MIN',
      'traditional': 'TRD'
    },
    'bangles': {
      'classic': 'CL',
      'kada': 'KD',
      'cuff': 'CF',
      'openable': 'OP',
      'adjustable': 'ADJ',
      'charm': 'CM',
      'diamond': 'DM',
      'gemstone': 'GS',
      'pearl': 'PRL',
      'bridal': 'BDL',
      'minimalist': 'MIN',
      'traditional': 'TRD',
      'temple': 'TMP',
      'kundan': 'KND',
      'polki': 'PLK',
      'navratna': 'NVR'
    },
    'pendants': {
      'solitaire': 'SOL',
      'halo': 'HL',
      'cluster': 'CLT',
      'heart': 'HRT',
      'cross': 'CRS',
      'initial': 'INI',
      'diamond': 'DM',
      'gemstone': 'GS',
      'pearl': 'PRL',
      'bridal': 'BDL',
      'minimalist': 'MIN',
      'traditional': 'TRD'
    },
    'mangalsutra': {
      'traditional mangalsutra': 'TMS',
      'traditional_mangalsutra': 'TMS',
      'modern mangalsutra': 'MMS',
      'modern_mangalsutra': 'MMS',
      'thali thirumangalyam chains': 'TTC',
      'thali_thirumangalyam_chains': 'TTC'
    },
    'mangalsutra & thali chains': {
      'traditional mangalsutra': 'TMS',
      'traditional_mangalsutra': 'TMS',
      'modern mangalsutra': 'MMS',
      'modern_mangalsutra': 'MMS',
      'thali thirumangalyam chains': 'TTC',
      'thali_thirumangalyam_chains': 'TTC'
    },
    'nose jewellery': {
      'nose pins': 'NP',
      'nose_pins': 'NP',
      'nose rings nath': 'NR',
      'nose_rings_nath': 'NR',
      'septum rings': 'SR',
      'septum_rings': 'SR'
    },
    'anklets & toe rings': {
      'silver anklets': 'SA',
      'silver_anklets': 'SA',
      'beaded anklets': 'BA',
      'beaded_anklets': 'BA',
      'bridal toe rings': 'BTR',
      'bridal_toe_rings': 'BTR',
      'daily wear toe rings': 'DTR',
      'daily_wear_toe_rings': 'DTR'
    },
    'brooches & pins': {
      'saree pins': 'SP',
      'saree_pins': 'SP',
      'suit brooches': 'SB',
      'suit_brooches': 'SB',
      'bridal brooches': 'BB',
      'bridal_brooches': 'BB',
      'cufflinks': 'CLF',
      'tie pins': 'TP',
      'tie_pins': 'TP'
    },
    'kids jewellery': {
      'baby bangles': 'BBG',
      'baby_bangles': 'BBG',
      'nazariya bracelets': 'NZB',
      'nazariya_bracelets': 'NZB',
      'kids earrings': 'KER',
      'kids_earrings': 'KER',
      'kids chains': 'KCH',
      'kids_chains': 'KCH',
      'kids rings': 'KRG',
      'kids_rings': 'KRG'
    },
    'bridal & special collections': {
      'bridal sets': 'BDS',
      'bridal_sets': 'BDS',
      'temple jewellery sets': 'TJS',
      'temple_jewellery_sets': 'TJS',
      'antique jewellery collections': 'AJC',
      'antique_jewellery_collections': 'AJC',
      'custom made jewellery': 'CMJ',
      'custom_made_jewellery': 'CMJ'
    },
    'shop by material / gemstone': {
      'gold jewellery 22k 18k 14k': 'GLD',
      'gold_jewellery_22k_18k_14k': 'GLD',
      'silver jewellery sterling oxidized': 'SLV',
      'silver_jewellery_sterling_oxidized': 'SLV',
      'platinum jewellery': 'PLT',
      'platinum_jewellery': 'PLT',
      'diamond jewellery': 'DMJ',
      'diamond_jewellery': 'DMJ',
      'gemstone jewellery': 'GSJ',
      'gemstone_jewellery': 'GSJ',
      'pearl jewellery': 'PRJ',
      'pearl_jewellery': 'PRJ',
      'fashion artificial jewellery': 'FAJ',
      'fashion_artificial_jewellery': 'FAJ'
    },
    'material': {
      'gold jewellery 22k 18k 14k': 'GLD',
      'gold_jewellery_22k_18k_14k': 'GLD',
      'silver jewellery sterling oxidized': 'SLV',
      'silver_jewellery_sterling_oxidized': 'SLV',
      'platinum jewellery': 'PLT',
      'platinum_jewellery': 'PLT',
      'diamond jewellery': 'DMJ',
      'diamond_jewellery': 'DMJ',
      'gemstone jewellery': 'GSJ',
      'gemstone_jewellery': 'GSJ',
      'pearl jewellery': 'PRJ',
      'pearl_jewellery': 'PRJ',
      'fashion artificial jewellery': 'FAJ',
      'fashion_artificial_jewellery': 'FAJ'
    }
  };
  
  const categoryMapping = subCategoryMappings[categoryKey];
  if (categoryMapping && categoryMapping[subCategoryKey]) {
    return categoryMapping[subCategoryKey];
  }
  
  // Fallback: create abbreviation from subcategory name
  return subCategory
    .replace(/[^a-zA-Z\s]/g, '')
    .split(' ')
    .map(word => word.substring(0, 3).toUpperCase())
    .join('')
    .substring(0, 4);
}

export function formatProductDataForBarcode(data: ProductBarcodeData): string {
  return JSON.stringify({
    code: data.productCode,
    name: data.productName,
    purity: data.purity,
    grossWeight: data.grossWeight,
    netWeight: data.netWeight,
    stones: data.stones,
    goldRate: data.goldRate,
    price: data.approxPrice
  });
}

export async function generateBarcode(data: string, productCode: string): Promise<{ barcode: string, imagePath: string }> {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads', 'barcodes');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // For now, just return the product code without file I/O for better performance
    // The actual barcode rendering will be done on the frontend
    const filename = `barcode-${productCode.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.txt`;
    
    // Skip file writing for better performance - return virtual path
    return {
      barcode: productCode,
      imagePath: `/uploads/barcodes/${filename}`
    };
  } catch (error) {
    console.error('Error generating barcode:', error);
    // Return a simple fallback
    return {
      barcode: productCode,
      imagePath: ''
    };
  }
}

export async function generateQRCode(data: ProductBarcodeData, productCode: string, productImagePath?: string): Promise<string> {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads', 'qrcodes');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate a beautiful product card image with stunning background
    console.log('🎨 Creating stunning product card image...');
    const productCardImagePath = await generateStunningProductCard({
      productData: data,
      productImagePath,
      backgroundStyle: 'luxury-gold' // Gorgeous gold luxury theme
    });
    
    // For production deployment, use the production domain
    // For development/testing, create self-contained product info
    let qrContent: string;
    
    if (process.env.NODE_ENV === 'production' && process.env.REPL_URL) {
      // Production: Link to hosted product card
      const baseUrl = process.env.REPL_URL;
      qrContent = `${baseUrl}${productCardImagePath}`;
      console.log(`✨ Production QR: ${qrContent}`);
    } else {
      // Development/Self-contained: Create rich product info that opens beautifully
      qrContent = `🏆 PALANIAPPA JEWELLERS
💎 ${data.productName}
📦 Code: ${data.productCode}
⚱️ Purity: ${data.purity}
⚖️ Weight: ${data.grossWeight} (Net: ${data.netWeight})
💍 Stone: ${data.stones}
💰 Price: ${data.approxPrice}
📞 Contact: +91 994 206 1393
🌐 Visit: Palaniappa Jewellers for exclusive collections`;
      console.log(`✨ Self-contained QR created for testing`);
    }

    // Generate QR code with appropriate content
    const filename = `qr-${productCode.replace(/[^a-zA-Z0-9]/g, '_')}-${Date.now()}.png`;
    const imagePath = path.join(uploadsDir, filename);
    
    await QRCode.toFile(imagePath, qrContent, {
      width: 300,
      margin: 4,
      color: {
        dark: '#8B7355',  // Elegant brown color matching the theme
        light: '#FFFFFF'  // White background
      },
      errorCorrectionLevel: 'H', // High error correction for better print quality
      type: 'png',
      scale: 10  // Higher scale for crisp printing
    });

    console.log('🔗 QR Code generated successfully! Scanning will now show stunning product card image');
    return `/uploads/qrcodes/${filename}`;
  } catch (error) {
    console.error('Error generating stunning QR code:', error);
    throw new Error('Failed to generate product showcase QR code');
  }
}

// Enhanced function for generating product cards as images
export async function generateBeautifulProductCard(data: ProductBarcodeData, productCode: string, productImagePath?: string): Promise<string> {
  try {
    console.log('🎨 Creating stunning product card image...');
    
    // Generate a beautiful product card image
    const productCardPath = await generateStunningProductCard({
      productData: data,
      productImagePath,
      backgroundStyle: 'luxury-gold' // You can make this configurable
    });
    
    console.log(`✨ Beautiful product card created: ${productCardPath}`);
    return productCardPath;
  } catch (error) {
    console.error('Error generating beautiful product card:', error);
    throw new Error('Failed to generate beautiful product card');
  }
}

export function parseProductFromBarcode(barcodeData: string): ProductBarcodeData | null {
  try {
    const parsed = JSON.parse(barcodeData);
    return {
      productCode: parsed.code,
      productName: parsed.name,
      purity: parsed.purity,
      grossWeight: parsed.grossWeight,
      netWeight: parsed.netWeight,
      stones: parsed.stones,
      goldRate: parsed.goldRate,
      approxPrice: parsed.price
    };
  } catch (error) {
    console.error('Error parsing barcode data:', error);
    return null;
  }
}