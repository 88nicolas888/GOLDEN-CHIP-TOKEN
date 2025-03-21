
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  walletAddress: string;
  username: string;
  gct: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  connectWallet: (walletAddress: string, username: string) => Promise<boolean>;
  disconnectWallet: () => void;
  updateGCT: (amount: number) => void;
  checkAndUpdateMiningRewards: () => void;
  checkUsernameExists: (username: string) => Promise<boolean>;
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

  // Clear all users when the app starts (for this request only)
  useEffect(() => {
    localStorage.removeItem('users');
    setLoading(false);
  }, []);

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

  // Run mining rewards check whenever the app is loaded
  useEffect(() => {
    if (user) {
      checkAndUpdateMiningRewards();
      
      // Set interval to check mining rewards every minute
      const interval = setInterval(checkAndUpdateMiningRewards, 60000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // For demo purposes, we're storing users in localStorage
  // In a real app, this would be a database
  const getUsers = (): Record<string, { walletAddress: string; username: string; gct: number }> => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, any>) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Check if username already exists
  const checkUsernameExists = async (username: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const users = getUsers();
    return Object.values(users).some(
      (user: any) => user.username.toLowerCase() === username.toLowerCase()
    );
  };

  const connectWallet = async (walletAddress: string, username: string): Promise<boolean> => {
    // Validate wallet address is not empty
    if (!walletAddress.trim()) {
      toast({
        title: "Invalid wallet address",
        description: "Please enter a wallet address",
        variant: "destructive"
      });
      return false;
    }
    
    // Validate username
    if (!username.trim() || username.length < 3) {
      toast({
        title: "Invalid username",
        description: "Please enter a username with at least 3 characters",
        variant: "destructive"
      });
      return false;
    }
    
    // Check if username is already taken
    const isUsernameTaken = await checkUsernameExists(username);
    if (isUsernameTaken) {
      toast({
        title: "Username unavailable",
        description: "This username is already taken. Please choose a different one.",
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
      // If wallet exists, use existing record but update username
      [userId, { gct: userGct }] = existingUser;
      users[userId].username = username; // Update username
      saveUsers(users);
    } else {
      // Create new user record for this wallet
      userId = Date.now().toString();
      userGct = 0;
      users[userId] = { walletAddress, username, gct: userGct };
      saveUsers(users);
    }
    
    // Connect the wallet
    const loggedInUser = {
      id: userId,
      walletAddress,
      username,
      gct: userGct
    };
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    
    // Check mining rewards right after connecting
    setTimeout(checkAndUpdateMiningRewards, 500);
    
    toast({
      title: "Wallet connected",
      description: `Connected as ${username}`,
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

  // Function to check if mining is active and calculate rewards
  const checkAndUpdateMiningRewards = () => {
    if (!user) return;
    
    const miningEndTime = localStorage.getItem('miningEndTime');
    const lastRewardCalculation = localStorage.getItem('lastRewardCalculation');
    
    if (!miningEndTime) return;
    
    const now = Date.now();
    const endTime = parseInt(miningEndTime, 10);
    
    // If mining has ended, stop calculating rewards
    if (endTime < now) {
      localStorage.removeItem('miningEndTime');
      localStorage.removeItem('lastRewardCalculation');
      localStorage.removeItem('lastRewardTime');
      return;
    }
    
    // Calculate rewards since last calculation
    const lastCalcTime = lastRewardCalculation ? parseInt(lastRewardCalculation, 10) : 0;
    
    if (lastCalcTime === 0) {
      // First calculation, just set the timestamp and return
      localStorage.setItem('lastRewardCalculation', now.toString());
      return;
    }
    
    // Calculate seconds passed since last calculation (max 1 hour to prevent abuse)
    const secondsPassed = Math.min(Math.floor((now - lastCalcTime) / 1000), 3600);
    
    if (secondsPassed <= 0) return;
    
    // Calculate rewards (1 GCT every 5 seconds)
    const rewardsEarned = Math.floor(secondsPassed / 5);
    
    if (rewardsEarned > 0) {
      // Update balance
      updateGCT(rewardsEarned);
      
      // Update last calculation time
      localStorage.setItem('lastRewardCalculation', now.toString());
      
      console.log(`Added ${rewardsEarned} GCT from offline mining. ${secondsPassed} seconds passed.`);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      connectWallet, 
      disconnectWallet, 
      updateGCT,
      checkAndUpdateMiningRewards,
      checkUsernameExists
    }}>
      {children}
    </AuthContext.Provider>
  );
};
