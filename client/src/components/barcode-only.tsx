import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { Product } from '@shared/schema';

interface BarcodeOnlyProps {
  product: Product;
  className?: string;
}

export function BarcodeOnly({ product, className }: BarcodeOnlyProps) {
  const productType = product.name.split(' ')[0].toUpperCase();
  const grossWeight = `${product.grossWeight} g`;

  const handlePrint = () => {
    if (product.barcodeImageUrl) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Barcode - ${product.name}</title>
              <style>
                @page {
                  size: A4;
                  margin: 0.5in;
                }
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 0; 
                  padding: 20px; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  height: 100vh;
                  box-sizing: border-box;
                }
                .barcode-container { 
                  border: 3px solid #000; 
                  border-radius: 15px; 
                  padding: 30px; 
                  width: 400px; 
                  max-width: 90%;
                  text-align: center; 
                  background: white;
                  position: relative;
                  box-sizing: border-box;
                  page-break-inside: avoid;
                }
                .hole-dot {
                  position: absolute;
                  top: 15px;
                  right: 15px;
                  width: 20px;
                  height: 20px;
                  background: #000;
                  border-radius: 50%;
                }
                .store-name {
                  font-size: 20px;
                  font-weight: bold;
                  margin-bottom: 15px;
                  letter-spacing: 1px;
                }
                .product-code-large {
                  font-size: 28px;
                  font-weight: bold;
                  margin-bottom: 15px;
                  font-family: monospace;
                }
                .product-info {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 15px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                .weight-info {
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 20px;
                }
                .barcode-image {
                  margin: 20px 0;
                  max-width: 100%;
                  height: auto;
                }
                .product-code-bottom {
                  font-size: 18px;
                  font-weight: bold;
                  font-family: monospace;
                  margin-top: 15px;
                }
              </style>
            </head>
            <body>
              <div class="barcode-container">
                <div class="hole-dot"></div>
                <div class="store-name">PALANIAPPA JEWELLERS</div>
                <div class="product-code-large">${product.productCode}</div>
                <div class="product-info">
                  <span>${productType}</span>
                  <span>${product.purity || '22K'}</span>
                </div>
                <div class="weight-info">Gross Weight : ${grossWeight}</div>
                <img src="${product.barcodeImageUrl}" alt="Barcode" class="barcode-image" />
                <div class="product-code-bottom">${product.productCode}</div>
              </div>
              <script>setTimeout(() => { window.print(); window.close(); }, 500);</script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <rect x="2" y="6" width="2" height="12"/>
            <rect x="6" y="6" width="1" height="12"/>
            <rect x="9" y="6" width="1" height="12"/>
            <rect x="12" y="6" width="2" height="12"/>
            <rect x="16" y="6" width="1" height="12"/>
            <rect x="19" y="6" width="2" height="12"/>
          </svg>
          Product Barcode
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Barcode Display */}
        <div className="border-2 border-black rounded-xl p-6 bg-white text-center max-w-sm mx-auto relative"
             style={{ fontFamily: 'Arial, sans-serif' }}>
          
          {/* Black dot for hanging hole */}
          <div className="absolute top-3 right-3 w-5 h-5 bg-black rounded-full"></div>
          
          {/* Store Name */}
          <div className="text-lg font-bold mb-3 tracking-wide">
            PALANIAPPA JEWELLERS
          </div>
          
          {/* Product Code (Large) */}
          <div className="text-2xl font-bold mb-3 font-mono">
            {product.productCode}
          </div>
          
          {/* Product Type and Purity */}
          <div className="text-lg font-bold mb-3 flex justify-between items-center">
            <span>{productType}</span>
            <span>{product.purity || '22K'}</span>
          </div>
          
          {/* Weight */}
          <div className="text-base font-bold mb-4">
            Gross Weight : {grossWeight}
          </div>
          
          {/* Barcode Image */}
          {product.barcodeImageUrl ? (
            <div className="flex justify-center mb-4">
              <img 
                src={product.barcodeImageUrl} 
                alt={`Barcode for ${product.productCode}`}
                className="border border-gray-300 rounded bg-white p-2"
                style={{ maxWidth: '250px', height: 'auto' }}
              />
            </div>
          ) : (
            <div className="flex justify-center mb-4 text-gray-500">
              <div className="border border-gray-300 rounded bg-gray-50 p-4">
                <p className="text-sm">No barcode generated</p>
              </div>
            </div>
          )}
          
          {/* Product Code (Bottom) */}
          <div className="text-lg font-bold font-mono">
            {product.productCode}
          </div>
        </div>

        {/* Print Button */}
        <Button 
          onClick={handlePrint}
          variant="outline" 
          className="w-full mt-4"
          disabled={!product.barcodeImageUrl}
        >
          <Printer className="h-4 w-4 mr-2" />
          Print Barcode Only
        </Button>
      </CardContent>
    </Card>
  );
}