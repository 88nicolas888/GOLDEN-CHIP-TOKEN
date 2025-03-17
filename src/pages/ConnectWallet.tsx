
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet } from 'lucide-react';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { connectWallet, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to game page
  if (user) {
    navigate('/game');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress.trim()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await connectWallet(walletAddress);
      if (success) {
        navigate('/game');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-game-background p-4 page-transition">
      <div className="glass rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-game-blue/20 flex items-center justify-center">
              <Wallet size={32} className="text-game-blue" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Connect your crypto wallet to start catching GCT tokens</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="rounded-lg p-3 bg-white/80 font-mono"
              required
            />
            <p className="text-xs text-muted-foreground">Enter your Ethereum wallet address (e.g., 0x1234...5678)</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full py-6 bg-gradient-to-r from-game-blue to-game-purple text-white text-lg rounded-xl shadow-md btn-hover"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/home" className="text-sm text-muted-foreground hover:underline mt-4 inline-block">
            Learn More About GCT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
