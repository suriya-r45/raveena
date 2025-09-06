import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EstimateForm } from "@/components/admin/estimate-form";
import { EstimatesList } from "@/components/admin/estimates-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Plus, List, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

export function EstimatesPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [location, setLocation] = useLocation();
  const { user, isAdmin } = useAuth();
  
  // Check authentication and redirect if not admin
  useEffect(() => {
    if (user && !isAdmin) {
      setLocation('/');
    } else if (!user) {
      setLocation('/login');
    }
  }, [user, isAdmin, setLocation]);

  // Handle URL tab parameter
  useEffect(() => {
    const url = new URL(window.location.href);
    const tabParam = url.searchParams.get('tab');
    if (tabParam === 'list' || tabParam === 'create') {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Show loading or nothing while checking authentication
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen py-8" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation('/admin')}
            className="mb-4 border-gray-200 text-gray-700 hover:bg-gray-50 w-full sm:w-auto text-sm px-3 py-2 font-light"
            data-testid="button-back-to-dashboard"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-luxury-black mb-2">Customer Estimates</h1>
            <p className="text-medium-grey">Create and manage jewelry estimates for your customers</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-gray-100 gap-1 p-1">
            <TabsTrigger value="list" className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-white data-[state=active]:text-gray-700 text-gray-600 px-2 py-2 text-xs md:text-sm rounded-md font-light">
              <List className="h-3 w-3 md:h-4 md:w-4" />
              <span>View Estimates</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center justify-center space-x-1 md:space-x-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 text-gray-600 px-2 py-2 text-xs md:text-sm rounded-md font-medium hover:bg-emerald-50 hover:text-emerald-600">
              <Plus className="h-3 w-3 md:h-4 md:w-4" />
              <span>Create Estimate</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <EstimatesList />
          </TabsContent>

          <TabsContent value="create">
            <EstimateForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}