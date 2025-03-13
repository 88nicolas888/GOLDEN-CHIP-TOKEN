
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Coin } from '@/components/Coin';
import { toast } from '@/components/ui/use-toast';

// Types
interface CoinType {
  id: string;
  x: number;
  y: number;
  duration: number;
  isSpecial: boolean;
  size: number;
  collected: boolean;
}

const Game = () => {
  const { user, updateGCT } = useAuth();
  const navigate = useNavigate();
  const [coins, setCoins] = useState<CoinType[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Start game with countdown
  const startGame = () => {
    setGameStarted(true);
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsPlaying(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle coin click
  const handleCoinClick = (id: string, isSpecial: boolean) => {
    // Mark the coin as collected
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === id ? { ...coin, collected: true } : coin
      )
    );

    // Update score
    const value = isSpecial ? 25 : 1;
    setScore((prev) => prev + value);
    
    // Show toast for special coins
    if (isSpecial) {
      toast({
        title: "Special Coin!",
        description: `You collected a special coin worth 25 GCT!`,
        className: "bg-game-yellow text-black",
      });
    }
  };

  // Spawn new coins
  useEffect(() => {
    if (!isPlaying) return;

    const spawnCoin = () => {
      if (!gameContainerRef.current) return;
      
      const containerWidth = gameContainerRef.current.clientWidth;
      const isSpecial = Math.random() < 0.01; // 1% chance for special coin
      const size = isSpecial ? 80 : 60;
      const x = Math.random() * (containerWidth - size);
      const duration = Math.random() * 4 + 3; // 3-7 seconds
      
      const newCoin: CoinType = {
        id: crypto.randomUUID(),
        x,
        y: -100,
        duration,
        isSpecial,
        size,
        collected: false,
      };
      
      setCoins((prevCoins) => [...prevCoins, newCoin]);
      
      // Schedule next coin spawn
      const nextSpawnTime = Math.random() * 800 + 200; // 0.2-1 second
      setTimeout(spawnCoin, nextSpawnTime);
    };

    // Start spawning coins
    spawnCoin();

    // Clean up old coins every 5 seconds
    const cleanupInterval = setInterval(() => {
      setCoins((prevCoins) => prevCoins.filter(
        coin => !coin.collected && 
        coin.y <= window.innerHeight + 200
      ));
    }, 5000);

    return () => {
      clearInterval(cleanupInterval);
    };
  }, [isPlaying]);

  // End game after 60 seconds
  useEffect(() => {
    if (isPlaying) {
      gameTimerRef.current = setTimeout(() => {
        setIsPlaying(false);
        updateGCT(score);
        toast({
          title: "Game Over!",
          description: `You collected ${score} GCT! Your new balance is ${user?.gct! + score} GCT.`,
        });
      }, 60 * 1000);
    }

    return () => {
      if (gameTimerRef.current) {
        clearTimeout(gameTimerRef.current);
      }
    };
  }, [isPlaying, score, updateGCT, user?.gct]);

  return (
    <div 
      ref={gameContainerRef}
      className="game-container relative"
    >
      {/* Game HUD */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-between items-center px-6">
        <div className="glass rounded-full px-5 py-2 flex items-center">
          <span className="font-bold">Score: </span>
          <span className="ml-2 text-xl font-bold">{score} GCT</span>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            onClick={() => navigate('/leaderboard')} 
            variant="outline"
            className="glass rounded-full"
          >
            Leaderboard
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
            className="glass rounded-full"
          >
            Home
          </Button>
        </div>
      </div>

      {/* Game Content */}
      {!gameStarted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-8 text-white">Coin Catcher</h1>
          <p className="text-xl mb-8 text-white text-center max-w-lg">
            Click on the falling coins to collect them. You have 60 seconds!
          </p>
          <Button 
            onClick={startGame}
            className="bg-gradient-to-r from-game-green to-game-blue text-white text-xl px-8 py-6 rounded-full shadow-lg animate-pulse-scale"
          >
            Start Game
          </Button>
        </div>
      )}

      {gameStarted && countdown > 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
          <div className="text-8xl font-bold text-white animate-pulse-scale">
            {countdown}
          </div>
        </div>
      )}

      {isPlaying && coins.map((coin) => (
        <Coin
          key={coin.id}
          coin={coin}
          onClick={() => handleCoinClick(coin.id, coin.isSpecial)}
        />
      ))}

      {gameStarted && !isPlaying && countdown === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
          <h1 className="text-4xl font-bold mb-4 text-white">Game Over!</h1>
          <p className="text-2xl mb-6 text-white">
            Your score: <span className="font-bold">{score} GCT</span>
          </p>
          <div className="flex space-x-4">
            <Button 
              onClick={() => {
                setScore(0);
                setCoins([]);
                startGame();
              }}
              className="bg-gradient-to-r from-game-green to-game-blue text-white px-6 py-3 rounded-full shadow-lg"
            >
              Play Again
            </Button>
            <Button 
              onClick={() => navigate('/leaderboard')}
              className="bg-gradient-to-r from-game-purple to-game-pink text-white px-6 py-3 rounded-full shadow-lg"
            >
              View Leaderboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
