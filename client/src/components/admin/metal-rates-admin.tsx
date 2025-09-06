import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, RefreshCw, Clock, MapPin, Loader2, Edit3, Save } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface MetalRate {
  id: string;
  metal: "GOLD" | "SILVER";
  purity: string;
  pricePerGramInr: string;
  pricePerGramBhd: string;
  pricePerGramUsd: string;
  market: "INDIA" | "BAHRAIN";
  source: string;
  lastUpdated: string;
}

export function MetalRatesAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Manual rate update form state
  const [manualRates, setManualRates] = useState({
    indiaGold22k: '',
    indiaGold18k: '',
    indiaSilver: '',
    bahrainGold22k: '',
    bahrainGold18k: '',
    bahrainSilver: ''
  });

  const { data: rates, isLoading } = useQuery<MetalRate[]>({
    queryKey: ["/api/metal-rates"],
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes for admin
  });

  const updateRatesMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/metal-rates/update", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update rates");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/metal-rates"] });
      toast({
        title: "Success",
        description: "Metal rates updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update metal rates",
        variant: "destructive",
      });
    },
  });

  const manualUpdateMutation = useMutation({
    mutationFn: async (rateData: any) => {
      const response = await fetch("/api/metal-rates/manual-update", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rateData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update rates manually");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/metal-rates"] });
      toast({
        title: "Success",
        description: "Metal rates updated manually",
      });
      // Reset form
      setManualRates({
        indiaGold22k: '',
        indiaGold18k: '',
        indiaSilver: '',
        bahrainGold22k: '',
        bahrainGold18k: '',
        bahrainSilver: ''
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update metal rates manually",
        variant: "destructive",
      });
    },
  });

  const formatPrice = (price: string, currency: string) => {
    const num = parseFloat(price);
    if (currency === 'BHD') {
      return `${num.toFixed(3)} BHD`;
    } else if (currency === 'INR') {
      return `₹${num.toFixed(0)}`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

  // Group rates by market and metal
  const groupedRates = rates?.reduce((acc, rate) => {
    const key = `${rate.market}-${rate.metal}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(rate);
    return acc;
  }, {} as Record<string, MetalRate[]>) || {};

  const getLastUpdated = (rates: MetalRate[]) => {
    if (!rates.length) return null;
    const mostRecent = rates.reduce((latest, rate) => {
      return new Date(rate.lastUpdated) > new Date(latest.lastUpdated) ? rate : latest;
    });
    return mostRecent.lastUpdated;
  };

  const getOldestUpdate = () => {
    if (!rates?.length) return null;
    return rates.reduce((oldest, rate) => {
      return new Date(rate.lastUpdated) < new Date(oldest.lastUpdated) ? rate : oldest;
    });
  };

  const oldestRate = getOldestUpdate();
  const isStale = oldestRate && (Date.now() - new Date(oldestRate.lastUpdated).getTime()) > 6 * 60 * 60 * 1000; // 6 hours

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate rates
    const requiredRates = [
      'indiaGold22k', 'indiaGold18k', 'indiaSilver', 
      'bahrainGold22k', 'bahrainGold18k', 'bahrainSilver'
    ];
    
    const hasValidRates = requiredRates.some(key => 
      manualRates[key as keyof typeof manualRates] && 
      parseFloat(manualRates[key as keyof typeof manualRates]) > 0
    );

    if (!hasValidRates) {
      toast({
        title: "Error",
        description: "Please enter at least one valid rate",
        variant: "destructive",
      });
      return;
    }

    manualUpdateMutation.mutate(manualRates);
  };

  const getCurrentRate = (market: string, metal: string, purity: string) => {
    return rates?.find(rate => 
      rate.market === market && 
      rate.metal === metal && 
      rate.purity === purity
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gradient flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Metal Rates Management
          </CardTitle>
          <div className="flex items-center gap-2">
            {isStale && (
              <Badge variant="destructive" className="animate-pulse">
                Rates Need Update
              </Badge>
            )}
            <Button
              onClick={() => updateRatesMutation.mutate()}
              disabled={updateRatesMutation.isPending}
              size="sm"
              className="flex items-center gap-2"
            >
              {updateRatesMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Update Rates
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Monitor and update live gold and silver prices for both markets - all product prices update automatically based on weight
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view">Current Rates</TabsTrigger>
            <TabsTrigger value="manual">Manual Update</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Manual Rate Update (Per Gram)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Update metal rates manually. All product prices will automatically recalculate based on their weight.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSubmit} className="space-y-6">
                  
                  {/* India Rates */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        INDIA (INR per gram)
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="indiaGold22k">Gold 22K (₹/gram)</Label>
                        <Input
                          id="indiaGold22k"
                          type="number"
                          step="0.01"
                          placeholder={getCurrentRate("INDIA", "GOLD", "22K")?.pricePerGramInr || "6563"}
                          value={manualRates.indiaGold22k}
                          onChange={(e) => setManualRates(prev => ({...prev, indiaGold22k: e.target.value}))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="indiaGold18k">Gold 18K (₹/gram)</Label>
                        <Input
                          id="indiaGold18k"
                          type="number"
                          step="0.01"
                          placeholder={getCurrentRate("INDIA", "GOLD", "18K")?.pricePerGramInr || "5372"}
                          value={manualRates.indiaGold18k}
                          onChange={(e) => setManualRates(prev => ({...prev, indiaGold18k: e.target.value}))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="indiaSilver">Silver 925 (₹/gram)</Label>
                        <Input
                          id="indiaSilver"
                          type="number"
                          step="0.01"
                          placeholder={getCurrentRate("INDIA", "SILVER", "925")?.pricePerGramInr || "95"}
                          value={manualRates.indiaSilver}
                          onChange={(e) => setManualRates(prev => ({...prev, indiaSilver: e.target.value}))}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Bahrain Rates */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        BAHRAIN (BHD per gram)
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bahrainGold22k">Gold 22K (BHD/gram)</Label>
                        <Input
                          id="bahrainGold22k"
                          type="number"
                          step="0.001"
                          placeholder={getCurrentRate("BAHRAIN", "GOLD", "22K")?.pricePerGramBhd || "28.228"}
                          value={manualRates.bahrainGold22k}
                          onChange={(e) => setManualRates(prev => ({...prev, bahrainGold22k: e.target.value}))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bahrainGold18k">Gold 18K (BHD/gram)</Label>
                        <Input
                          id="bahrainGold18k"
                          type="number"
                          step="0.001"
                          placeholder={getCurrentRate("BAHRAIN", "GOLD", "18K")?.pricePerGramBhd || "23.090"}
                          value={manualRates.bahrainGold18k}
                          onChange={(e) => setManualRates(prev => ({...prev, bahrainGold18k: e.target.value}))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bahrainSilver">Silver 925 (BHD/gram)</Label>
                        <Input
                          id="bahrainSilver"
                          type="number"
                          step="0.001"
                          placeholder={getCurrentRate("BAHRAIN", "SILVER", "925")?.pricePerGramBhd || "1.25"}
                          value={manualRates.bahrainSilver}
                          onChange={(e) => setManualRates(prev => ({...prev, bahrainSilver: e.target.value}))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={manualUpdateMutation.isPending}
                      className="w-full flex items-center gap-2"
                    >
                      {manualUpdateMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {manualUpdateMutation.isPending ? "Updating Rates..." : "Update Metal Rates"}
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900">📊 Impact of Rate Updates:</p>
                    <ul className="mt-1 text-blue-800 space-y-1">
                      <li>• All gold product prices will recalculate based on their weight in grams</li>
                      <li>• Silver product prices will update automatically</li>
                      <li>• Price changes apply immediately on the website</li>
                      <li>• Leave fields empty to keep current rates unchanged</li>
                    </ul>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="view" className="space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading rates...</span>
              </div>
            ) : rates?.length ? (
          Object.entries(groupedRates).map(([key, metalRates]) => {
            const [market, metal] = key.split('-');
            const lastUpdated = getLastUpdated(metalRates);
            const isGroupStale = lastUpdated && (Date.now() - new Date(lastUpdated).getTime()) > 6 * 60 * 60 * 1000;
            
            return (
              <div key={key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={metal === 'GOLD' ? 'default' : 'secondary'} 
                      className="premium-gradient"
                    >
                      {metal === 'GOLD' ? '🥇' : '🥈'} {metal}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {market}
                    </Badge>
                    {isGroupStale && (
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        Stale
                      </Badge>
                    )}
                  </div>
                  {lastUpdated && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {metalRates
                    .sort((a, b) => {
                      if (metal === 'GOLD') {
                        const purityOrder = { '24K': 0, '22K': 1, '18K': 2 };
                        return (purityOrder[a.purity as keyof typeof purityOrder] || 999) - 
                               (purityOrder[b.purity as keyof typeof purityOrder] || 999);
                      }
                      return a.purity.localeCompare(b.purity);
                    })
                    .map((rate) => (
                      <div key={rate.id} className="p-4 rounded-lg border bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{rate.purity}</span>
                          <Badge variant="outline" className="text-xs">
                            {rate.source}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {rate.market === 'INDIA' && (
                            <div className="text-sm font-medium">
                              INR: {formatPrice(rate.pricePerGramInr, 'INR')}
                            </div>
                          )}
                          {rate.market === 'BAHRAIN' && (
                            <div className="text-sm font-medium">
                              BHD: {formatPrice(rate.pricePerGramBhd, 'BHD')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                
                {key !== Object.keys(groupedRates)[Object.keys(groupedRates).length - 1] && (
                  <Separator className="my-4" />
                )}
              </div>
            );
          })
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No metal rates available</p>
                <Button 
                  onClick={() => updateRatesMutation.mutate()}
                  disabled={updateRatesMutation.isPending}
                  className="mt-4"
                >
                  {updateRatesMutation.isPending ? "Fetching..." : "Fetch Initial Rates"}
                </Button>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground text-center pt-4 border-t space-y-2">
              <p>
                <strong>Auto-update:</strong> Rates are automatically updated every 6 hours
              </p>
              <p>
                <strong>Manual update:</strong> Use the "Update Rates" button for immediate refresh
              </p>
              <p>
                <strong>Sources:</strong> Live data from metals.live API with fallback to market approximations
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}