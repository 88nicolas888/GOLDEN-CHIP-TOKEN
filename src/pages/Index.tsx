
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

const Index = () => {
  const { user, disconnectWallet } = useAuth();
  const navigate = useNavigate();

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
        
        <div className="absolute inset-0 crypto-grid opacity-20"></div>
        
        <svg className="absolute inset-0 w-full h-full z-[-1]">
          <line x1="20%" y1="30%" x2="40%" y2="50%" stroke="#7AA2F7" strokeWidth="1" strokeOpacity="0.1" />
          <line x1="40%" y1="50%" x2="60%" y2="70%" stroke="#7AA2F7" strokeWidth="1" strokeOpacity="0.1" />
          <line x1="60%" y1="70%" x2="80%" y2="30%" stroke="#7AA2F7" strokeWidth="1" strokeOpacity="0.1" />
          <line x1="80%" y1="30%" x2="20%" y2="30%" stroke="#7AA2F7" strokeWidth="1" strokeOpacity="0.1" />
          <circle cx="20%" cy="30%" r="4" fill="#7AA2F7" fillOpacity="0.2" />
          <circle cx="40%" cy="50%" r="4" fill="#7AA2F7" fillOpacity="0.2" />
          <circle cx="60%" cy="70%" r="4" fill="#7AA2F7" fillOpacity="0.2" />
          <circle cx="80%" cy="30%" r="4" fill="#7AA2F7" fillOpacity="0.2" />
        </svg>
      </div>

      {/* User wallet & balance */}
      {user && (
        <div className="absolute top-4 left-4 z-50">
          <div className="glass rounded-full px-5 py-2 flex items-center space-x-2">
            <Wallet size={16} className="text-white" />
            <span className="font-bold text-white">{user.walletAddress.substring(0, 6)}...{user.walletAddress.substring(38)}</span>
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

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-12 page-transition">
        <div className="perspective-500 mb-12">
          <div className="preserve-3d animate-spin-slow">
            <div className="relative w-32 h-32 rounded-full" style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, #E0AF68 25%, #D4A456 100%)",
              boxShadow: "0 0 20px rgba(224, 175, 104, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.8)"
            }}>
              <div className="absolute inset-0 rounded-full flex items-center justify-center preserve-3d backface-hidden" 
                style={{ transform: "translateZ(2px)" }}>
                <div className="text-white font-bold flex flex-col items-center justify-center drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">
                  <span className="text-2xl">GCT</span>
                </div>
              </div>
              
              <div className="absolute inset-0 rounded-full flex items-center justify-center preserve-3d backface-hidden" 
                style={{ 
                  transform: "rotateY(180deg) translateZ(2px)",
                  background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.9) 0%, #E0AF68 25%, #D4A456 100%)"
                }}>
                <div className="text-white font-bold flex flex-col items-center justify-center drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">
                  <span className="text-2xl">GCT</span>
                </div>
              </div>
              
              <div className="absolute inset-0 rounded-full" style={{
                transform: "translateZ(0px)",
                background: "linear-gradient(to right, #D4A456, #FFD700, #D4A456)",
                border: "1px solid #FFD700"
              }}></div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-game-blue to-game-green">
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
                className="btn-hover bg-gradient-to-r from-game-green to-game-blue text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Start Mining
              </Button>
              <Button 
                onClick={() => navigate('/leaderboard')} 
                className="btn-hover bg-gradient-to-r from-game-purple to-game-pink text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Leaderboard
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => navigate('/connect-wallet')} 
              className="btn-hover bg-gradient-to-r from-game-green to-game-blue text-white text-lg px-8 py-6 rounded-full shadow-lg flex items-center"
            >
              <Wallet size={24} className="mr-2" /> Connect Wallet
            </Button>
          )}
        </div>

        <div className="glass rounded-xl p-6 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">How To Mine GCT</h2>
          <ul className="list-disc pl-6 space-y-2 text-white">
            <li>Click "Start Mining" to begin automatic mining</li>
            <li>Mining generates 1 GCT every 5 seconds</li>
            <li>Mining runs for 24 hours once activated</li>
            <li>You can only start mining once per day</li>
            <li>When mining ends, come back tomorrow to restart</li>
            <li>Compete with other miners to reach the top of the leaderboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
