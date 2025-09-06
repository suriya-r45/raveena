import { MetalRatesService } from '../services/testmetalRatesService.js';

export interface PricingCalculation {
  priceInr: number;
  priceBhd: number;
  metalCostInr: number;
  metalCostBhd: number;
  makingCharges: number;
  breakdown: {
    baseMetalCost: number;
    makingChargesAmount: number;
    total: number;
  };
}

/**
 * Calculate product pricing based on current metal rates and weight
 */
export async function calculateProductPricing(
  metalType: 'GOLD' | 'SILVER',
  purity: string,
  grossWeight: number,
  netWeight: number,
  makingChargesPercentage: number = 15,
  market: 'INDIA' | 'BAHRAIN' = 'INDIA'
): Promise<PricingCalculation> {
  try {
    // Get current metal rates
    const rates = await MetalRatesService.getLatestRates(market);
    
    // Find the appropriate rate for the metal type and purity
    const metalRate = rates.find(rate => 
      rate.metal === metalType && 
      rate.purity === purity && 
      rate.market === market
    );

    if (!metalRate) {
      throw new Error(`No rate found for ${metalType} ${purity} in ${market} market`);
    }

    // Calculate base metal cost using net weight (actual metal content)
    const metalCostInr = netWeight * parseFloat(metalRate.pricePerGramInr);
    const metalCostBhd = netWeight * parseFloat(metalRate.pricePerGramBhd);

    // Calculate making charges (percentage of metal cost)
    const makingChargesAmountInr = (metalCostInr * makingChargesPercentage) / 100;
    const makingChargesAmountBhd = (metalCostBhd * makingChargesPercentage) / 100;

    // Calculate total prices
    const totalPriceInr = metalCostInr + makingChargesAmountInr;
    const totalPriceBhd = metalCostBhd + makingChargesAmountBhd;

    return {
      priceInr: Math.round(totalPriceInr),
      priceBhd: parseFloat(totalPriceBhd.toFixed(3)),
      metalCostInr: Math.round(metalCostInr),
      metalCostBhd: parseFloat(metalCostBhd.toFixed(3)),
      makingCharges: makingChargesPercentage,
      breakdown: {
        baseMetalCost: Math.round(metalCostInr),
        makingChargesAmount: Math.round(makingChargesAmountInr),
        total: Math.round(totalPriceInr)
      }
    };
  } catch (error) {
    console.error('Error calculating product pricing:', error);
    throw error;
  }
}

/**
 * Update prices for all metal-based products when rates change
 */
export async function recalculateAllMetalBasedProducts(): Promise<{ updated: number; errors: number }> {
  try {
    const { storage } = await import('../storage.js');
    
    // Get all products that are metal-price-based
    const allProducts = await storage.getAllProducts();
    const metalBasedProducts = allProducts.filter(product => product.isMetalPriceBased);

    let updated = 0;
    let errors = 0;

    console.log(`Found ${metalBasedProducts.length} metal-based products to recalculate`);

    for (const product of metalBasedProducts) {
      try {
        if (!product.metalType || !product.purity || !product.grossWeight || !product.netWeight) {
          console.warn(`Skipping product ${product.id}: missing metal data`);
          errors++;
          continue;
        }

        const metalType = product.metalType as 'GOLD' | 'SILVER';
        const grossWeight = parseFloat(product.grossWeight.toString());
        const netWeight = parseFloat(product.netWeight.toString());
        const makingCharges = parseFloat(product.makingChargesPercentage?.toString() || '15');

        // Calculate new prices for both markets
        const indiaePricing = await calculateProductPricing(
          metalType,
          product.purity,
          grossWeight,
          netWeight,
          makingCharges,
          'INDIA'
        );

        const bahrainPricing = await calculateProductPricing(
          metalType,
          product.purity,
          grossWeight,
          netWeight,
          makingCharges,
          'BAHRAIN'
        );

        // Update product in database
        await storage.updateProduct(product.id, {
          priceInr: indiaePricing.priceInr,
          priceBhd: bahrainPricing.priceBhd
        } as any);

        updated++;
        console.log(`Updated pricing for product ${product.name}: ₹${indiaePricing.priceInr} | BD ${bahrainPricing.priceBhd}`);
      } catch (error) {
        console.error(`Error updating product ${product.id}:`, error);
        errors++;
      }
    }

    console.log(`Product price recalculation complete: ${updated} updated, ${errors} errors`);
    return { updated, errors };
  } catch (error) {
    console.error('Error recalculating metal-based products:', error);
    throw error;
  }
}