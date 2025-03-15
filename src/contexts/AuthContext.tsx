
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  walletAddress: string;
  gct: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  connectWallet: (walletAddress: string) => Promise<boolean>;
  disconnectWallet: () => void;
  updateGCT: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // For demo purposes, we're storing users in localStorage
  // In a real app, this would be a database
  const getUsers = (): Record<string, { walletAddress: string; gct: number }> => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, any>) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const connectWallet = async (walletAddress: string): Promise<boolean> => {
    // Validate wallet address format (basic validation)
    if (!walletAddress.startsWith('0x') || walletAddress.length !== 42) {
      toast({
        title: "Invalid wallet address",
        description: "Please enter a valid cryptocurrency wallet address",
        variant: "destructive"
      });
      return false;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    
    // Check if wallet already exists in our records
    let userId = '';
    let userGct = 0;
    
    const existingUser = Object.entries(users).find(
      ([id, user]) => user.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
    
    if (existingUser) {
      // If wallet exists, use existing record
      [userId, { gct: userGct }] = existingUser;
    } else {
      // Create new user record for this wallet
      userId = Date.now().toString();
      userGct = 0;
      users[userId] = { walletAddress, gct: userGct };
      saveUsers(users);
    }
    
    // Connect the wallet
    const loggedInUser = {
      id: userId,
      walletAddress,
      gct: userGct
    };
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    
    toast({
      title: "Wallet connected",
      description: `Connected to ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`,
    });
    return true;
  };

  const disconnectWallet = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const updateGCT = (amount: number) => {
    if (!user) return;
    
    // Update user in state
    const updatedUser = { ...user, gct: user.gct + amount };
    setUser(updatedUser);
    
    // Update user in localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update user in "database"
    const users = getUsers();
    if (users[user.id]) {
      users[user.id].gct = updatedUser.gct;
      saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, connectWallet, disconnectWallet, updateGCT }}>
      {children}
    </AuthContext.Provider>
  );
};
