import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, Plus, CheckCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Seller: React.FC = () => {
  const [formData, setFormData] = useState({
    energyUnits: '',
    pricePerUnit: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.energyUnits || !formData.pricePerUnit) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const units = parseFloat(formData.energyUnits);
    const price = parseFloat(formData.pricePerUnit);

    if (units <= 0 || price <= 0) {
      toast({
        title: "Invalid Values",
        description: "Please enter valid positive numbers.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Energy Listed Successfully! ⚡",
      description: `${units} kWh listed at ₹${price} per unit. Total value: ₹${(units * price).toFixed(2)}`,
    });

    // Reset form
    setFormData({ energyUnits: '', pricePerUnit: '' });
    setIsSubmitting(false);
  };

  const totalValue = formData.energyUnits && formData.pricePerUnit 
    ? (parseFloat(formData.energyUnits) * parseFloat(formData.pricePerUnit)).toFixed(2)
    : '0.00';

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-solar rounded-xl">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Seller Dashboard</h1>
              <p className="text-muted-foreground">List your excess solar energy for sale</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Listing Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-energy">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <span>List New Energy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Energy Units */}
                  <div className="space-y-2">
                    <Label htmlFor="energyUnits">Energy Units (kWh) *</Label>
                    <div className="relative">
                      <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="energyUnits"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter energy units"
                        value={formData.energyUnits}
                        onChange={(e) => handleInputChange('energyUnits', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Price per Unit */}
                  <div className="space-y-2">
                    <Label htmlFor="pricePerUnit">Price per Unit (₹) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="pricePerUnit"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Enter price per kWh"
                        value={formData.pricePerUnit}
                        onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Total Value Display */}
                  {(formData.energyUnits && formData.pricePerUnit) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          Total Value:
                        </span>
                        <span className="text-xl font-bold text-primary">
                          ₹{totalValue}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.energyUnits || !formData.pricePerUnit}
                    className="w-full btn-solar group"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Listing Energy...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>List Energy</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* How it Works */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="text-lg">How Selling Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">List Your Energy</h4>
                    <p className="text-sm text-muted-foreground">
                      Enter the amount of excess solar energy and your desired price
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Blockchain Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Your listing is recorded on the blockchain for transparency
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Get Paid</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive instant payments when buyers purchase your energy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="text-lg">Market Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Price</span>
                  <span className="font-semibold text-foreground">₹4.20/kWh</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Listings</span>
                  <span className="font-semibold text-foreground">127</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Volume Today</span>
                  <span className="font-semibold text-foreground">2,450 kWh</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your Rank</span>
                  <span className="font-semibold text-primary">#15</span>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="text-lg">Selling Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    💡 <strong>Peak Hours:</strong> Energy sells faster during 10 AM - 4 PM
                  </p>
                </div>
                
                <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    📊 <strong>Competitive Pricing:</strong> Check market average before listing
                  </p>
                </div>
                
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground">
                    🔗 <strong>Blockchain Benefits:</strong> All transactions are transparent and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Seller;