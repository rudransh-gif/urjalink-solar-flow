import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History as HistoryIcon, TrendingUp, TrendingDown, Calendar, Filter, Search } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  counterparty: string;
  counterpartyAddress: string;
  units: number;
  pricePerUnit: number;
  totalAmount: number;
  status: 'completed' | 'pending' | 'failed';
  date: Date;
  transactionHash: string;
}

const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'sell',
      counterparty: 'EcoTech Industries',
      counterpartyAddress: '0x9876543210fedcba9876543210fedcba98765432',
      units: 45.5,
      pricePerUnit: 4.20,
      totalAmount: 191.10,
      status: 'completed',
      date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      transactionHash: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz'
    },
    {
      id: '2',
      type: 'buy',
      counterparty: 'Solar Farm Beta',
      counterpartyAddress: '0x1357924680ace135792468ace135792468ace135',
      units: 25.0,
      pricePerUnit: 3.95,
      totalAmount: 98.75,
      status: 'completed',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      transactionHash: '0xdef456ghi789jkl012mno345pqr678stu901vwx234yzabc123'
    },
    {
      id: '3',
      type: 'sell',
      counterparty: 'GreenTech Solutions',
      counterpartyAddress: '0x2468ace135792468ace135792468ace135792468',
      units: 60.8,
      pricePerUnit: 4.15,
      totalAmount: 252.32,
      status: 'pending',
      date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      transactionHash: '0xghi789jkl012mno345pqr678stu901vwx234yzabc123def456'
    },
    {
      id: '4',
      type: 'buy',
      counterparty: 'Residential Solar Co',
      counterpartyAddress: '0x369258147bcdef369258147bcdef369258147bcd',
      units: 15.2,
      pricePerUnit: 4.50,
      totalAmount: 68.40,
      status: 'failed',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      transactionHash: '0xjkl012mno345pqr678stu901vwx234yzabc123def456ghi789'
    },
    {
      id: '5',
      type: 'sell',
      counterparty: 'Clean Energy Hub',
      counterpartyAddress: '0x147bcd369258147bcd369258147bcd369258147b',
      units: 35.7,
      pricePerUnit: 4.05,
      totalAmount: 144.59,
      status: 'completed',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      transactionHash: '0xmno345pqr678stu901vwx234yzabc123def456ghi789jkl012'
    }
  ]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.counterpartyAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalBought = transactions
    .filter(t => t.type === 'buy' && t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const totalSold = transactions
    .filter(t => t.type === 'sell' && t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const totalEnergyTraded = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.units, 0);

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
            <div className="p-3 bg-gradient-energy rounded-xl">
              <HistoryIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
              <p className="text-muted-foreground">View all your energy trading transactions</p>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
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
                  <p className="text-sm text-muted-foreground mb-1">Total Sold</p>
                  <p className="text-2xl font-bold text-primary">₹{totalSold.toFixed(2)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Bought</p>
                  <p className="text-2xl font-bold text-secondary">₹{totalBought.toFixed(2)}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Energy Traded</p>
                  <p className="text-2xl font-bold text-accent">{totalEnergyTraded.toFixed(1)} kWh</p>
                </div>
                <Calendar className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="card-glow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filter Transactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by counterparty or address..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="card-glow hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      {/* Transaction Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <Badge
                            className={`${
                              transaction.type === 'buy' 
                                ? 'bg-secondary text-secondary-foreground' 
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            {transaction.type.toUpperCase()}
                          </Badge>
                          
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.toUpperCase()}
                          </Badge>

                          <span className="text-sm text-muted-foreground">
                            {formatDate(transaction.date)}
                          </span>
                        </div>

                        <h3 className="font-semibold text-foreground mb-1">
                          {transaction.counterparty}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatAddress(transaction.counterpartyAddress)}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Tx: {formatAddress(transaction.transactionHash)}
                        </p>
                      </div>

                      {/* Amount Details */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground mb-1">
                          ₹{transaction.totalAmount.toFixed(2)}
                        </p>
                        
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{transaction.units} kWh</p>
                          <p>@ ₹{transaction.pricePerUnit}/kWh</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card className="card-glow">
              <CardContent className="p-12 text-center">
                <HistoryIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Transactions Found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterType !== 'all' || filterStatus !== 'all'
                    ? 'Try adjusting your filters to see more results.'
                    : 'Start trading energy to see your transaction history here.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default History;