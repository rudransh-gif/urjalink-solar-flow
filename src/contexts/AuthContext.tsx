import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  walletAddress?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, walletAddress?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app start
    const savedUser = localStorage.getItem('urjalink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    };
    
    setUser(mockUser);
    localStorage.setItem('urjalink_user', JSON.stringify(mockUser));
    setIsLoading(false);
    
    return true;
  };

  const signup = async (name: string, email: string, password: string, walletAddress?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful signup
    const mockUser: User = {
      id: '1',
      name,
      email,
      walletAddress: walletAddress || `0x${Math.random().toString(16).substr(2, 40)}`,
    };
    
    setUser(mockUser);
    localStorage.setItem('urjalink_user', JSON.stringify(mockUser));
    setIsLoading(false);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('urjalink_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};