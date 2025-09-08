import { useAuth } from '@/lib/auth';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { Currency } from '@/lib/currency';
import ProductForm from '@/components/admin/product-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AddProduct() {
  const { isAdmin, token } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('INR');

  useEffect(() => {
    if (!isAdmin && !token) {
      setLocation('/login');
    }
  }, [isAdmin, token, setLocation]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header selectedCurrency={selectedCurrency} onCurrencyChange={setSelectedCurrency} />
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-white shadow-lg border border-red-200">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
              <p className="text-gray-600 mb-6">You need admin privileges to add products.</p>
              <Button onClick={() => setLocation('/login')}>
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header selectedCurrency={selectedCurrency} onCurrencyChange={setSelectedCurrency} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setLocation('/admin?tab=products')}
            className="mb-4"
            data-testid="button-back-to-admin"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          
          <Card className="bg-white shadow-lg border border-amber-200">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center gap-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                <Plus className="h-8 w-8 text-amber-700" />
                Add New Product
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Create a new jewelry product for your store
              </p>
            </CardHeader>
            <CardContent>
              <ProductForm currency="INR" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}