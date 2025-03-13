
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  username: string;
  gct: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
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
  const getUsers = (): Record<string, { username: string; password: string; gct: number }> => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  };

  const saveUsers = (users: Record<string, any>) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    const userRecord = Object.entries(users).find(
      ([id, user]) => user.username === username && user.password === password
    );
    
    if (userRecord) {
      const [id, userData] = userRecord;
      const loggedInUser = {
        id,
        username: userData.username,
        gct: userData.gct
      };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${username}!`,
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid username or password",
      variant: "destructive"
    });
    return false;
  };

  const signup = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    
    // Check if username already exists
    if (Object.values(users).some(user => user.username === username)) {
      toast({
        title: "Signup failed",
        description: "Username already exists",
        variant: "destructive"
      });
      return false;
    }
    
    // Create new user
    const id = Date.now().toString();
    users[id] = { username, password, gct: 0 };
    saveUsers(users);
    
    // Log in the new user
    const newUser = { id, username, gct: 0 };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast({
      title: "Signup successful",
      description: "Your account has been created!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
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
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateGCT }}>
      {children}
    </AuthContext.Provider>
  );
};
