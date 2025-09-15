import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Users, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface EnergyListing {
  id: string;
  sellerAddress: string;
  sellerName: string;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  status: 'open' | 'sold';
  location: string;
  listedAt: Date;
  rating: number;
}

const Buyer: React.FC = () => {
  const [listings] = useState<EnergyListing[]>([
    {
      id: '1',
      sellerAddress: '0x1234567890abcdef1234567890abcdef12345678',
      sellerName: 'Solar Farm Alpha',
      units: 50.5,
      pricePerUnit: 4.20,
      totalPrice: 212.10,
      status: 'open',
      location: 'Mumbai, MH',
      listedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      rating: 4.8,
    },
    {
      id: '2',
      sellerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      sellerName: 'GreenTech Solutions',
      units: 25.0,
      pricePerUnit: 3.95,
      totalPrice: 98.75,
      status: 'open',
      location: 'Bangalore, KA',
      listedAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      rating: 4.9,
    },
    {
      id: '3',
      sellerAddress: '0x567890abcdef1234567890abcdef1234567890ab',
      sellerName: 'Residential Solar',
      units: 15.2,
      pricePerUnit: 4.50,
      totalPrice: 68.40,
      status: 'open',
      location: 'Delhi, DL',
      listedAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      rating: 4.6,
    },
    {
      id: '4',
      sellerAddress: '0x890abcdef1234567890abcdef1234567890abcde',
      sellerName: 'Solar Paradise',
      units: 75.8,
      pricePerUnit: 4.10,
      totalPrice: 310.78,
      status: 'sold',
      location: 'Chennai, TN',
      listedAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      rating: 4.7,
    },
  ]);

  const { toast } = useToast();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const handleBuyEnergy = (listing: EnergyListing) => {
    toast({
      title: "Energy Purchased Successfully! ⚡",
      description: `You bought ${listing.units} kWh for ₹${listing.totalPrice.toFixed(2)} from ${listing.sellerName}`,
    });
  };

  const openListings = listings.filter(listing => listing.status === 'open');
  const totalAvailableEnergy = openListings.reduce((sum, listing) => sum + listing.units, 0);
  const averagePrice = openListings.reduce((sum, listing) => sum + listing.pricePerUnit, 0) / openListings.length;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-tech rounded-xl">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Buyer Marketplace</h1>
              <p className="text-muted-foreground">Purchase clean solar energy from verified sellers</p>
            </div>
          </div>
        </motion.div>

        {/* Market Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available Energy</p>
                  <p className="text-2xl font-bold text-primary">{totalAvailableEnergy.toFixed(1)} kWh</p>
                </div>
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Sellers</p>
                  <p className="text-2xl font-bold text-secondary">{openListings.length}</p>
                </div>
                <Users className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Price</p>
                  <p className="text-2xl font-bold text-accent">₹{averagePrice.toFixed(2)}/kWh</p>
                </div>
                <Zap className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Energy Listings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">Available Energy Listings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className={`card-energy h-full ${listing.status === 'sold' ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {listing.sellerName}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {formatAddress(listing.sellerAddress)}
                        </p>
                      </div>
                      <Badge
                        variant={listing.status === 'open' ? 'default' : 'secondary'}
                        className={listing.status === 'open' ? 'bg-primary' : ''}
                      >
                        {listing.status === 'open' ? 'Available' : 'Sold'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Energy Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Energy Units</span>
                        <span className="font-semibold text-foreground">{listing.units} kWh</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price per Unit</span>
                        <span className="font-semibold text-foreground">₹{listing.pricePerUnit}</span>
                      </div>
                      
                      <div className="flex items-center justify-between border-t pt-2">
                        <span className="text-sm font-medium text-foreground">Total Price</span>
                        <span className="text-lg font-bold text-primary">₹{listing.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Seller Info */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{listing.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i < Math.floor(listing.rating) 
                                  ? 'bg-accent' 
                                  : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground">{listing.rating}</span>
                      </div>
                    </div>

                    {/* Time and Action */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatTimeAgo(listing.listedAt)}
                        </span>
                      </div>

                      {listing.status === 'open' ? (
                        <Button
                          onClick={() => handleBuyEnergy(listing)}
                          className="btn-tech"
                          size="sm"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Now
                        </Button>
                      ) : (
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm">Sold</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No listings message */}
        {openListings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Energy Available
            </h3>
            <p className="text-muted-foreground">
              Check back later for new energy listings from our sellers.
            </p>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Buyer;