
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, User } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home page
  if (user) {
    navigate('/home');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress.trim() || !username.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both wallet address and username",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await connectWallet(walletAddress, username);
      if (success) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection failed",
        description: "Could not connect your wallet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-poker-felt p-4 page-transition">
      <div className="poker-card rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-poker-red/20 flex items-center justify-center">
              <Wallet size={32} className="text-poker-red" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-poker-black">Connect Your Wallet</h1>
          <p className="text-poker-gray">Connect your crypto wallet to start collecting GCT tokens</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-poker-black">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="rounded-lg p-3 pl-10 bg-white/95 border-poker-gold/50"
                required
              />
            </div>
            <p className="text-xs text-poker-gray">Choose a username to display on the leaderboard</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="walletAddress" className="text-poker-black">Wallet Address</Label>
            <Input
              id="walletAddress"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="rounded-lg p-3 bg-white/95 font-mono border-poker-gold/50"
              required
            />
            <p className="text-xs text-poker-gray">Enter your Ethereum wallet address (e.g., 0x1234...5678)</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-poker-red to-poker-gold text-white text-lg rounded-xl shadow-md btn-hover"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/home" className="text-sm text-poker-blue hover:underline mt-4 inline-block">
            Learn More About GCT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
