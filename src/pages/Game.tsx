
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Coin } from '@/components/Coin';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { formatTime } from '@/lib/utils';

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
  const [timeLeft, setTimeLeft] = useState(60);
  const [cooldownTime, setCooldownTime] = useState(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Get cooldown from localStorage
  useEffect(() => {
    const storedCooldown = localStorage.getItem('gameCooldown');
    if (storedCooldown) {
      const cooldownEnd = parseInt(storedCooldown, 10);
      const currentTime = Date.now();
      
      if (cooldownEnd > currentTime) {
        setCooldownTime(Math.ceil((cooldownEnd - currentTime) / 1000));
      } else {
        localStorage.removeItem('gameCooldown');
      }
    }
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldownTime <= 0) {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
      return;
    }

    cooldownTimerRef.current = setInterval(() => {
      setCooldownTime(prev => {
        if (prev <= 1) {
          clearInterval(cooldownTimerRef.current!);
          localStorage.removeItem('gameCooldown');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, [cooldownTime]);

  // Start game with countdown
  const startGame = () => {
    if (cooldownTime > 0) {
      toast({
        title: "Please wait",
        description: `You can play again in ${formatTime(cooldownTime)}`,
        variant: "destructive",
      });
      return;
    }
    
    setGameStarted(true);
    setCountdown(3);
    setTimeLeft(60);
    setScore(0);
    setCoins([]);
    
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

  // Game timer (60 seconds)
  useEffect(() => {
    if (!isPlaying) return;

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isPlaying]);

  // Handle coin click
  const handleCoinClick = (id: string, isSpecial: boolean) => {
    // Mark the coin as collected
    setCoins((prevCoins) =>
      prevCoins.map((coin) =>
        coin.id === id ? { ...coin, collected: true } : coin
      )
    );

    // Update score and show real-time GCT update
    const value = isSpecial ? 25 : 1;
    setScore((prev) => {
      const newScore = prev + value;
      updateGCT(value); // Update GCT in real-time
      return newScore;
    });
    
    // Show toast for special coins
    if (isSpecial) {
      toast({
        title: "Special Coin!",
        description: `You collected a special coin worth 25 GCT!`,
        className: "bg-game-yellow text-black",
      });
    }
  };

  // End game function
  const endGame = () => {
    setIsPlaying(false);
    
    // Set cooldown (5 minutes)
    const cooldownEnd = Date.now() + (5 * 60 * 1000);
    localStorage.setItem('gameCooldown', cooldownEnd.toString());
    setCooldownTime(5 * 60);
    
    toast({
      title: "Game Over!",
      description: `You collected ${score} GCT! Your current balance is ${user?.gct} GCT. You can play again in 5 minutes.`,
    });
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

  // Clean up timers
  useEffect(() => {
    return () => {
      if (gameTimerRef.current) {
        clearTimeout(gameTimerRef.current);
      }
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={gameContainerRef}
      className="game-container relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
    >
      {/* Game HUD */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-between items-center px-6">
        <div className="glass rounded-full px-5 py-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <div>
            <span className="font-bold text-white">Balance: </span>
            <span className="ml-2 text-xl font-bold text-game-yellow">{user?.gct} GCT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Score: </span>
            <span className="ml-2 text-xl font-bold text-game-green">{score} GCT</span>
          </div>
          {isPlaying && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Time: </span>
              <span className="ml-2 text-xl font-bold text-game-blue">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Button 
            onClick={() => navigate('/leaderboard')} 
            variant="outline"
            className="glass rounded-full text-white border-game-blue hover:bg-game-blue/20"
          >
            Leaderboard
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
            className="glass rounded-full text-white border-game-green hover:bg-game-green/20"
          >
            Home
          </Button>
        </div>
      </div>

      {/* Time progress bar */}
      {isPlaying && (
        <div className="absolute top-20 left-6 right-6 z-40">
          <Progress value={(timeLeft / 60) * 100} className="h-2 bg-white/30" indicatorClassName="bg-gradient-to-r from-game-blue to-game-green" />
        </div>
      )}

      {/* Game Content */}
      {!gameStarted && cooldownTime <= 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="glass p-8 rounded-2xl max-w-lg">
            <h1 className="text-4xl font-bold mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-game-green to-game-blue">GCT AIRDROP</h1>
            <p className="text-xl mb-8 text-white text-center">
              Collect falling GCT tokens to increase your crypto balance! You have 60 seconds!
            </p>
            <Button 
              onClick={startGame}
              className="bg-gradient-to-r from-game-green to-game-blue text-white text-xl px-8 py-6 rounded-full shadow-lg animate-pulse-scale w-full"
            >
              Start Mining
            </Button>
          </div>
        </div>
      )}

      {/* Cooldown screen */}
      {!gameStarted && cooldownTime > 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="glass p-8 rounded-2xl max-w-lg">
            <h1 className="text-4xl font-bold mb-6 text-white">Mining Cooldown</h1>
            <div className="text-2xl mb-8 text-white text-center">
              <p className="mb-4">Next mining session available in:</p>
              <div className="text-4xl font-bold mb-6 text-game-yellow">{formatTime(cooldownTime)}</div>
              <Progress value={(cooldownTime / (5 * 60)) * 100} className="h-4 w-64 mx-auto mb-8 bg-gray-700" indicatorClassName="bg-gradient-to-r from-game-orange to-game-yellow" />
            </div>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-gradient-to-r from-game-purple to-game-pink text-white px-6 py-3 rounded-full shadow-lg w-full"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}

      {gameStarted && countdown > 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
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

      {gameStarted && !isPlaying && countdown === 0 && cooldownTime > 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="glass p-8 rounded-2xl max-w-lg">
            <h1 className="text-4xl font-bold mb-4 text-white">Mining Session Ended!</h1>
            <p className="text-2xl mb-6 text-white">
              Session reward: <span className="font-bold text-game-yellow">{score} GCT</span>
            </p>
            <p className="text-xl mb-6 text-white">
              Wallet balance: <span className="font-bold text-game-green">{user?.gct} GCT</span>
            </p>
            <div className="mb-6">
              <p className="text-xl text-white mb-2">Cooldown period:</p>
              <div className="text-2xl font-bold text-game-yellow mb-2">{formatTime(cooldownTime)}</div>
              <Progress value={(cooldownTime / (5 * 60)) * 100} className="h-3 w-full bg-gray-700" indicatorClassName="bg-gradient-to-r from-game-orange to-game-yellow" />
            </div>
            <Button 
              onClick={() => navigate('/leaderboard')}
              className="bg-gradient-to-r from-game-purple to-game-pink text-white px-6 py-3 rounded-full shadow-lg w-full"
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
