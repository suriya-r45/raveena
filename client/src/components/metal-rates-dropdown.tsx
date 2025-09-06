import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TrendingUp } from 'lucide-react';

interface MetalRate {
  id: string;
  metal: string;
  purity: string;
  pricePerGramInr: string;
  pricePerGramBhd: string;
  market: string;
  lastUpdated: string;
}

interface MetalRatesDropdownProps {
  selectedCurrency: 'INR' | 'BHD';
}

export function MetalRatesDropdown({ selectedCurrency }: MetalRatesDropdownProps) {
  const { data: metalRates = [] } = useQuery<MetalRate[]>({
    queryKey: ['/api/metal-rates'],
    refetchInterval: 60000, // Refresh every minute
  });

  // Filter rates based on selected currency (market)
  const market = selectedCurrency === 'INR' ? 'INDIA' : 'BAHRAIN';
  const filteredRates = metalRates.filter(rate => rate.market === market);
  
  // Get currency symbol
  const currencySymbol = selectedCurrency === 'INR' ? '₹' : 'BD';
  const decimals = selectedCurrency === 'INR' ? 0 : 3;

  // Group rates by metal type
  const goldRates = filteredRates
    .filter(rate => rate.metal === 'GOLD')
    .sort((a, b) => {
      // Sort by purity: 22K, 18K, 14K
      const order = { '22K': 1, '18K': 2, '14K': 3 };
      return (order[a.purity as keyof typeof order] || 999) - (order[b.purity as keyof typeof order] || 999);
    });
  
  const silverRates = filteredRates.filter(rate => rate.metal === 'SILVER');

  // Get the most recent update time
  const lastUpdated = metalRates.length > 0 
    ? new Date(metalRates[0].lastUpdated).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    : '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="bg-white/90 hover:bg-white border border-gray-300 rounded-full px-3 py-2 h-8 md:h-10 shadow-sm hover:shadow-md transition-all duration-200 text-gray-800 font-medium"
          data-testid="button-gold-rate"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          <span className="text-xs md:text-sm">GOLD RATE</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-0 border border-gray-200 shadow-lg bg-white rounded-xl"
        align="end"
        data-testid="dropdown-metal-rates"
      >
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-t-xl border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">
            Today's Gold Rate
          </h3>
          <p className="text-xs text-gray-600 text-center">
            {selectedCurrency === 'INR' ? 'India Market' : 'Bahrain Market'}
          </p>
        </div>
        
        <div className="p-4 space-y-3">
          {/* Gold Rates */}
          {goldRates.length > 0 && (
            <div className="space-y-2">
              {goldRates.map((rate) => {
                const price = parseFloat(selectedCurrency === 'INR' ? rate.pricePerGramInr : rate.pricePerGramBhd);
                const purityLabel = rate.purity === '22K' ? '22 KT(916)' : 
                                   rate.purity === '18K' ? '18 KT(750)' : 
                                   rate.purity === '14K' ? '14 KT(585)' : rate.purity;
                
                return (
                  <div 
                    key={rate.id} 
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100"
                    data-testid={`rate-gold-${rate.purity}`}
                  >
                    <span className="font-semibold text-gray-800">
                      {purityLabel}
                    </span>
                    <span className="font-bold text-amber-700">
                      {currencySymbol} {price.toFixed(decimals)}/g
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Silver Rates */}
          {silverRates.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Silver Rate</h4>
              {silverRates.map((rate) => {
                const price = parseFloat(selectedCurrency === 'INR' ? rate.pricePerGramInr : rate.pricePerGramBhd);
                
                return (
                  <div 
                    key={rate.id} 
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100"
                    data-testid={`rate-silver-${rate.purity}`}
                  >
                    <span className="font-semibold text-gray-800">
                      Silver {rate.purity}
                    </span>
                    <span className="font-bold text-gray-700">
                      {currencySymbol} {price.toFixed(decimals)}/g
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Updated on: {lastUpdated}
              </p>
            </div>
          )}

          {/* No data message */}
          {filteredRates.length === 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">No rates available</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}