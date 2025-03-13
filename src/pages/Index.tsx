
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-game-background">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-20 h-20 rounded-full bg-game-pink opacity-10 animate-float"></div>
        <div className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full bg-game-blue opacity-10 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[15%] left-[20%] w-24 h-24 rounded-full bg-game-green opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[25%] right-[10%] w-16 h-16 rounded-full bg-game-purple opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-12 page-transition">
        <div className="perspective mb-12">
          <div className="preserve-3d animate-spin-slow">
            <div className="relative w-32 h-32 rounded-full bg-game-yellow shadow-lg flex items-center justify-center text-white font-bold text-2xl">
              GCT
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-game-blue to-game-green">
          Coin Catcher Game
        </h1>
        
        <p className="text-xl mb-10 text-center max-w-lg">
          Catch falling coins to earn GCT. The more you catch, the higher your rank!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {user ? (
            <>
              <Button 
                onClick={() => navigate('/game')} 
                className="btn-hover bg-gradient-to-r from-game-green to-game-blue text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Play Game
              </Button>
              <Button 
                onClick={() => navigate('/leaderboard')} 
                className="btn-hover bg-gradient-to-r from-game-purple to-game-pink text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Leaderboard
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => navigate('/login')} 
                className="btn-hover bg-gradient-to-r from-game-green to-game-blue text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/signup')} 
                className="btn-hover bg-gradient-to-r from-game-purple to-game-pink text-white text-lg px-8 py-6 rounded-full shadow-lg"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        <div className="glass rounded-xl p-6 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">How to Play</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Coins will randomly fall from the top of the screen</li>
            <li>Click on coins to catch them before they disappear</li>
            <li>Regular coins are worth 1 GCT</li>
            <li>Special golden coins (rare) are worth 25 GCT!</li>
            <li>Compete with others to reach the top of the leaderboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
