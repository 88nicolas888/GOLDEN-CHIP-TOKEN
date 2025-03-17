
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="animate-pulse-scale">
          <div className="w-20 h-20 rounded-full bg-game-yellow opacity-75"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-20 h-20 rounded-full bg-game-pink opacity-10 animate-float"></div>
        <div className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full bg-game-blue opacity-10 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[15%] left-[20%] w-24 h-24 rounded-full bg-game-green opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[25%] right-[10%] w-16 h-16 rounded-full bg-game-purple opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="absolute top-[50%] left-[50%] w-96 h-96 rounded-full border border-game-yellow/20 opacity-30 translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute top-[50%] left-[50%] w-72 h-72 rounded-full border border-game-green/20 opacity-30 translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute top-[50%] left-[50%] w-48 h-48 rounded-full border border-game-blue/20 opacity-30 translate-x-[-50%] translate-y-[-50%]"></div>
        
        {/* Glowing light effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      {/* User wallet & balance */}
      {user && (
        <div className="absolute top-4 left-4 z-50">
          <div className="glass rounded-full px-5 py-2 flex items-center space-x-2">
            <Wallet size={16} className="text-white" />
            <span className="font-medium text-white">{user.username}</span>
            <span className="text-xl font-bold text-game-yellow ml-2">{user.gct} GCT</span>
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
          {/* Enhanced 3D Coin with more realistic effects */}
          <div className="relative w-56 h-56 mx-auto preserve-3d animate-spin-slow">
            {/* Coin front face */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-amber-600 backface-hidden"
              style={{
                transform: 'translateZ(8px)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 215, 0, 0.6)'
              }}>
              <div className="flex items-center justify-center h-full">
                <div className="text-white font-bold text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">GCT</div>
              </div>
              {/* Realistic embossed effect */}
              <div className="absolute inset-5 rounded-full border-4 border-amber-300/30"></div>
              {/* Radial shine */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-yellow-100/80 via-transparent to-transparent" 
                  style={{
                    transformOrigin: '30% 30%',
                    transform: 'rotate(-35deg)',
                    opacity: 0.7
                  }}
                ></div>
              </div>
            </div>
            
            {/* Coin back face */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 backface-hidden"
              style={{
                transform: 'rotateY(180deg) translateZ(8px)',
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 215, 0, 0.6)'
              }}>
              <div className="flex items-center justify-center h-full">
                <div className="text-white font-bold text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">GCT</div>
              </div>
              {/* Realistic embossed effect */}
              <div className="absolute inset-5 rounded-full border-4 border-amber-300/30"></div>
              {/* Radial shine */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-yellow-100/80 via-transparent to-transparent" 
                  style={{
                    transformOrigin: '70% 30%',
                    transform: 'rotate(35deg)',
                    opacity: 0.7
                  }}
                ></div>
              </div>
            </div>
            
            {/* Coin edge - thicker and more detailed */}
            <div className="absolute inset-0 rounded-full"
              style={{
                transform: 'rotateY(90deg)',
                background: 'linear-gradient(to bottom, #FFD700, #B8860B, #FFD700)',
                width: '16px',
                left: 'calc(50% - 8px)',
                boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)'
              }}></div>
              
            {/* More coin edges for realistic 3D effect */}
            <div className="absolute inset-0 rounded-full"
              style={{
                transform: 'rotateX(90deg)',
                background: 'linear-gradient(to right, #FFD700, #B8860B, #FFD700)',
                height: '16px',
                top: 'calc(50% - 8px)',
                boxShadow: '0 0 8px rgba(255, 215, 0, 0.8)'
              }}></div>
              
            {/* Detailed coin rim with radial texture */}
            <div className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                transform: 'translateZ(0)',
                background: 'repeating-linear-gradient(to right, transparent, transparent 8px, rgba(255,215,0,0.3) 8px, rgba(255,215,0,0.3) 10px)',
                opacity: 0.5,
                mixBlendMode: 'overlay'
              }}></div>
              
            {/* Dynamic light reflection */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-70 backface-hidden"
              style={{
                transform: 'translateZ(9px) rotateZ(-15deg)', 
                background: 'linear-gradient(120deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 100%)'
              }}></div>
              
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-70 backface-hidden"
              style={{
                transform: 'rotateY(180deg) translateZ(9px) rotateZ(-15deg)', 
                background: 'linear-gradient(120deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 25%, rgba(255,255,255,0) 100%)'
              }}></div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-center text-white">
          GCT AIRDROP
        </h1>
        
        <p className="text-xl mb-10 text-center max-w-lg text-white">
          Mine GCT tokens automatically for 24 hours. Collect 1 GCT every 5 seconds and build your crypto balance!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {user ? (
            <>
              <Button 
                onClick={() => navigate('/game')} 
                className="bg-gradient-to-r from-game-green to-game-blue text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90"
              >
                Start Mining
              </Button>
              <Button 
                onClick={() => navigate('/leaderboard')} 
                className="bg-gradient-to-r from-game-purple to-game-pink text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90"
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
                className="bg-gradient-to-r from-game-green to-game-blue text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90 flex items-center"
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

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">How To Mine GCT</h2>
          <ul className="list-disc pl-6 space-y-2 text-white">
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
