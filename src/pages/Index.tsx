
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

const Index = () => {
  const { user, disconnectWallet, checkAndUpdateMiningRewards } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Add loading state to ensure content renders properly
  useEffect(() => {
    // Small timeout to ensure styles are applied
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Check for mining rewards when page loads
  useEffect(() => {
    if (user) {
      checkAndUpdateMiningRewards();
      
      // Set up interval to check mining rewards periodically
      const interval = setInterval(checkAndUpdateMiningRewards, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [user, checkAndUpdateMiningRewards]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-poker-felt">
        <div className="animate-pulse-scale">
          <div className="w-20 h-20 rounded-full bg-poker-gold opacity-75"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-poker-felt">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-24 h-24 opacity-20 animate-float">
          <img src="/spade.svg" alt="Spade" className="w-full h-full" />
        </div>
        <div className="absolute top-[30%] right-[15%] w-32 h-32 opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <img src="/heart.svg" alt="Heart" className="w-full h-full" />
        </div>
        <div className="absolute bottom-[15%] left-[20%] w-28 h-28 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <img src="/club.svg" alt="Club" className="w-full h-full" />
        </div>
        <div className="absolute bottom-[25%] right-[10%] w-24 h-24 opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>
          <img src="/diamond.svg" alt="Diamond" className="w-full h-full" />
        </div>
        
        {/* Card patterns in the background */}
        <div className="absolute top-[50%] left-[50%] w-96 h-96 rounded-full border border-poker-gold/20 opacity-30 translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute top-[50%] left-[50%] w-72 h-72 rounded-full border border-poker-red/20 opacity-30 translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute top-[50%] left-[50%] w-48 h-48 rounded-full border border-white/20 opacity-30 translate-x-[-50%] translate-y-[-50%]"></div>
      </div>

      {/* User wallet & balance */}
      {user && (
        <div className="absolute top-4 left-4 z-50">
          <div className="poker-chip rounded-full px-5 py-2 flex items-center space-x-2">
            <Wallet size={16} className="text-white" />
            <span className="font-medium text-white">{user.username}</span>
            <span className="text-xl font-bold text-poker-gold ml-2">{user.gct} GCT</span>
          </div>
          
          <Button 
            onClick={disconnectWallet} 
            variant="outline" 
            size="sm" 
            className="mt-2 text-white bg-black/30 hover:bg-black/50 rounded-full"
          >
            <LogOut size={14} className="mr-1" /> Disconnect
          </Button>
        </div>
      )}

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-12">
        <div className="mb-12 perspective">
          {/* Enhanced 3D Poker Chip with DOX POKER.NET design */}
          <div className="relative w-56 h-56 mx-auto preserve-3d animate-spin-slow">
            {/* Chip front face */}
            <div className="absolute inset-0 rounded-full backface-hidden"
              style={{
                transform: 'translateZ(8px)',
                backgroundImage: 'url("/diamond.svg")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 25px rgba(255, 215, 0, 0.6)'
              }}>
            </div>
            
            {/* Chip back face */}
            <div className="absolute inset-0 rounded-full backface-hidden"
              style={{
                transform: 'rotateY(180deg) translateZ(8px)',
                backgroundImage: 'url("/diamond.svg")',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 0 25px rgba(255, 215, 0, 0.6)'
              }}>
            </div>
            
            {/* Chip edge */}
            <div className="absolute inset-0 rounded-full"
              style={{
                transform: 'rotateY(90deg)',
                background: 'repeating-linear-gradient(to bottom, #FFD700, #000000, #FFD700 10px)',
                width: '16px',
                left: 'calc(50% - 8px)',
                boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)'
              }}></div>
              
            {/* More chip edges for realistic 3D effect */}
            <div className="absolute inset-0 rounded-full"
              style={{
                transform: 'rotateX(90deg)',
                background: 'repeating-linear-gradient(to right, #FFD700, #000000, #FFD700 10px)',
                height: '16px',
                top: 'calc(50% - 8px)',
                boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)'
              }}></div>
              
            {/* Dynamic light reflection */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-20 backface-hidden"
              style={{
                transform: 'translateZ(9px) rotateZ(-15deg)', 
                background: 'linear-gradient(120deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 100%)'
              }}></div>
              
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-20 backface-hidden"
              style={{
                transform: 'rotateY(180deg) translateZ(9px) rotateZ(-15deg)', 
                background: 'linear-gradient(120deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 100%)'
              }}></div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-center text-white">
          GCT TOKEN MINING
        </h1>
        
        <p className="text-xl mb-10 text-center max-w-lg text-white">
          Mine GCT tokens automatically for 24 hours. Collect 1 GCT every 5 seconds and build your crypto balance!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {user ? (
            <>
              <Button 
                onClick={() => navigate('/game')} 
                className="bg-gradient-to-r from-poker-red to-poker-gold text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90"
              >
                Start Mining
              </Button>
              <Button 
                onClick={() => navigate('/leaderboard')} 
                className="bg-gradient-to-r from-poker-blue to-poker-purple text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90"
              >
                Leaderboard
              </Button>
              <Button 
                onClick={() => navigate('/about')} 
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90"
              >
                <Info size={20} className="mr-2" />
                Learn More About GCT
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => navigate('/connect')} 
                className="bg-gradient-to-r from-poker-red to-poker-gold text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90 flex items-center"
              >
                <Wallet size={24} className="mr-2" /> Connect Wallet
              </Button>
              <Button 
                onClick={() => navigate('/about')} 
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90"
              >
                <Info size={20} className="mr-2" />
                Learn More About GCT
              </Button>
            </>
          )}
        </div>

        <div className="poker-card rounded-xl p-6 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-poker-black">How To Mine GCT</h2>
          <ul className="list-disc pl-6 space-y-2 text-poker-black">
            <li>Click "Start Mining" to begin automatic mining</li>
            <li>Mining generates 1 GCT every 5 seconds</li>
            <li>Mining runs for 24 hours once activated</li>
            <li>You can only start mining once per day</li>
            <li>Mining continues even when you're offline!</li>
            <li>When mining ends, come back tomorrow to restart</li>
            <li>Compete with other miners to reach the top of the leaderboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
