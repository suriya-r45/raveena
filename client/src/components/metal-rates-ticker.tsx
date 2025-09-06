import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface MetalRate {
  id: string;
  metal: string;
  purity: string;
  pricePerGramInr: string;
  pricePerGramBhd: string;
  market: string;
  lastUpdated: string;
}

export function MetalRatesTicker() {
  const { data: metalRates = [] } = useQuery<MetalRate[]>({
    queryKey: ['/api/metal-rates'],
    refetchInterval: 60000, // Refresh every minute
  });

  // Get today's date for display
  const todayDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  // Filter and format rates for display in organized order
  const getFormattedRates = () => {
    const rates: { text: string, isGoldToday: boolean, isHighlight: boolean }[] = [];
    
    // Helper function to format rate (removed emoji flags to avoid duplication)
    const formatRate = (rate: MetalRate, isHighlight = false) => {
      const countryName = rate.market === 'INDIA' ? 'INDIA' : 'BAHRAIN';
      const currency = rate.market === 'INDIA' ? '₹' : 'BD';
      const price = parseFloat(rate.market === 'INDIA' ? rate.pricePerGramInr : rate.pricePerGramBhd);
      const decimals = rate.market === 'INDIA' ? 0 : 3;
      
      if (rate.metal === 'GOLD') {
        const goldText = isHighlight 
          ? `TODAY'S GOLD ${rate.purity}: ${currency} ${price.toFixed(decimals)}/g`
          : `Gold ${rate.purity}: ${currency} ${price.toFixed(decimals)}/g`;
        return { text: goldText, isGoldToday: isHighlight, isHighlight };
      } else if (rate.metal === 'SILVER') {
        return { text: `Silver 925: ${currency} ${price.toFixed(decimals)}/g`, isGoldToday: false, isHighlight: false };
      }
      return null;
    };

    // Add special "Today's Gold Rate" intro
    rates.push({ text: `📅 ${todayDate} - Live Metal Rates`, isGoldToday: false, isHighlight: true });
    
    // Order: BH 22KT, IN 22KT, BH 18KT, IN 18KT, then silver rates
    // Find and add Gold 22K rates (highlight the first one as "TODAY'S")
    const bh22K = metalRates.find(r => r.market === 'BAHRAIN' && r.metal === 'GOLD' && r.purity === '22K');
    const in22K = metalRates.find(r => r.market === 'INDIA' && r.metal === 'GOLD' && r.purity === '22K');
    
    if (bh22K) rates.push(formatRate(bh22K, true)!);  // Highlight first gold rate
    if (in22K) rates.push(formatRate(in22K, true)!);  // Highlight second gold rate
    
    // Find and add Gold 18K rates
    const bh18K = metalRates.find(r => r.market === 'BAHRAIN' && r.metal === 'GOLD' && r.purity === '18K');
    const in18K = metalRates.find(r => r.market === 'INDIA' && r.metal === 'GOLD' && r.purity === '18K');
    
    if (bh18K) rates.push(formatRate(bh18K)!);
    if (in18K) rates.push(formatRate(in18K)!);
    
    // Find and add Silver rates
    const bhSilver = metalRates.find(r => r.market === 'BAHRAIN' && r.metal === 'SILVER' && r.purity === '925');
    const inSilver = metalRates.find(r => r.market === 'INDIA' && r.metal === 'SILVER' && r.purity === '925');
    
    if (bhSilver) rates.push(formatRate(bhSilver)!);
    if (inSilver) rates.push(formatRate(inSilver)!);
    
    return rates.filter(Boolean);
  };

  const rates = getFormattedRates();
  
  if (rates.length === 0) return null;

  return (
    <>
      <style>
        {`
          @keyframes scroll-ticker {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          .ticker-scroll {
            animation: scroll-ticker 20s linear infinite;
          }
          
          @media (max-width: 768px) {
            .ticker-scroll {
              animation: scroll-ticker 12s linear infinite;
            }
          }
          
          .ticker-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 text-gray-800 py-4 overflow-hidden relative shadow-lg border-b-2 border-amber-200 w-full">
        <div className="ticker-scroll whitespace-nowrap w-full">
          <div className="inline-flex items-center space-x-8 w-max">
            {/* Duplicate the rates to create seamless loop */}
            {[...rates, ...rates].map((rateObj, index) => {
              // Determine market from rate position in array (rates are ordered: Date, BH 22K, IN 22K, BH 18K, IN 18K, BH Silver, IN Silver)
              const originalIndex = index % rates.length;
              const isIndia = originalIndex > 1 && (originalIndex - 1) % 2 === 1; // Odd indices are India rates (skip date)
              const isBahrain = originalIndex > 1 && (originalIndex - 1) % 2 === 0; // Even indices are Bahrain rates (skip date)
              const isDateItem = originalIndex === 0;
              
              let bgClass = "bg-white border-gray-300 text-gray-800";
              let textClass = "text-sm font-semibold";
              
              if (rateObj.isGoldToday) {
                bgClass = "bg-gradient-to-r from-amber-400 to-yellow-500 border-amber-600 text-white shadow-lg";
                textClass = "text-sm font-bold tracking-wide";
              } else if (rateObj.isHighlight) {
                bgClass = "bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-700 text-white shadow-lg";
                textClass = "text-sm font-bold";
              }
              
              return (
                <span key={index} className={`${textClass} px-5 py-2 ${bgClass} rounded-full border flex items-center gap-3 shadow-md`}>
                  {!isDateItem && isIndia && (
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <rect width="24" height="8" fill="#FF9933"/>
                        <rect y="8" width="24" height="8" fill="#FFFFFF"/>
                        <rect y="16" width="24" height="8" fill="#138808"/>
                        <circle cx="12" cy="12" r="3" fill="#000080"/>
                      </svg>
                    </div>
                  )}
                  {!isDateItem && isBahrain && (
                    <div className="w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <rect width="24" height="12" fill="#FFFFFF"/>
                        <rect y="12" width="24" height="12" fill="#CE1126"/>
                        <path d="M0 0 L8 6 L0 12 V8 L4 6 L0 4 Z" fill="#CE1126"/>
                      </svg>
                    </div>
                  )}
                  {rateObj.isGoldToday && (
                    <span className="text-xs bg-white text-amber-600 px-2 py-0.5 rounded-full font-bold animate-pulse">LIVE</span>
                  )}
                  <span>{rateObj.text}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}