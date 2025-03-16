
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { formatTime } from '@/lib/utils';
import { Sparkles, Clock, Trophy, BarChart4 } from 'lucide-react';

const Game = () => {
  const { user, updateGCT, checkAndUpdateMiningRewards } = useAuth();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [nextRewardTime, setNextRewardTime] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const rewardTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check localStorage for current mining state on load
  useEffect(() => {
    const miningEndTime = localStorage.getItem('miningEndTime');
    const lastMiningDay = localStorage.getItem('lastMiningDay');
    
    const today = new Date().toDateString();
    const now = Date.now();
    
    // If mining was active and hasn't expired
    if (miningEndTime) {
      const endTime = parseInt(miningEndTime, 10);
      
      if (endTime > now) {
        // Mining is still active
        setIsActive(true);
        setRemainingTime(Math.floor((endTime - now) / 1000));
        
        // Set next reward timer (maximum 5 seconds)
        const lastRewardTime = localStorage.getItem('lastRewardTime');
        if (lastRewardTime) {
          const nextTime = parseInt(lastRewardTime, 10) + 5000 - now;
          setNextRewardTime(Math.max(0, Math.min(5, Math.floor(nextTime / 1000))));
        } else {
          setNextRewardTime(5);
        }
      } else {
        // Mining has ended
        localStorage.removeItem('miningEndTime');
        localStorage.removeItem('lastRewardTime');
        setIsActive(false);
        setRemainingTime(0);
      }
    }
    
    // Check if already mined today
    if (lastMiningDay === today && !isActive) {
      toast({
        title: "Mining limit reached",
        description: "You can only start mining once per day. Please come back tomorrow.",
        variant: "destructive",
      });
    }
    
    // Perform initial check for offline mining rewards
    checkAndUpdateMiningRewards();
  }, [checkAndUpdateMiningRewards]);

  // Start mining function
  const startMining = () => {
    const today = new Date().toDateString();
    const lastMiningDay = localStorage.getItem('lastMiningDay');
    
    // Check if already mined today
    if (lastMiningDay === today) {
      toast({
        title: "Mining limit reached",
        description: "You can only start mining once per day. Please come back tomorrow.",
        variant: "destructive",
      });
      return;
    }
    
    // Set mining duration (24 hours = 86400 seconds)
    const miningDuration = 24 * 60 * 60; 
    const endTime = Date.now() + (miningDuration * 1000);
    
    // Save to localStorage for background mining
    localStorage.setItem('miningEndTime', endTime.toString());
    localStorage.setItem('lastMiningDay', today);
    localStorage.setItem('lastRewardCalculation', Date.now().toString());
    
    // Initialize first reward
    giveReward();
    
    // Update state
    setIsActive(true);
    setRemainingTime(miningDuration);
    setNextRewardTime(5);
    
    toast({
      title: "Mining Started",
      description: "You are now mining GCT! You'll receive 1 GCT every 5 seconds for the next 24 hours, even when offline.",
    });
  };

  // Give GCT reward function - used only when actively on the page
  const giveReward = () => {
    if (!user) return;
    
    // Record last reward time
    localStorage.setItem('lastRewardTime', Date.now().toString());
    
    // Give 1 GCT (but don't call updateGCT directly to avoid double counting)
    // Instead, call the background mining reward calculation which will add the correct amount
    checkAndUpdateMiningRewards();
  };

  // Reward timer effect - visual only when on the page
  useEffect(() => {
    if (!isActive) return;
    
    // Clear previous interval
    if (rewardTimerRef.current) clearInterval(rewardTimerRef.current);
    
    // Set next reward countdown
    rewardTimerRef.current = setInterval(() => {
      setNextRewardTime(prev => {
        if (prev <= 1) {
          giveReward();
          return 5; // Reset to 5 seconds
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (rewardTimerRef.current) clearInterval(rewardTimerRef.current);
    };
  }, [isActive, user]);

  // Mining timer effect - for UI display only
  useEffect(() => {
    if (!isActive) return;
    
    // Clear previous interval
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Start counting down remaining time
    timerIntervalRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          // Mining completed
          clearInterval(timerIntervalRef.current!);
          clearInterval(rewardTimerRef.current!);
          localStorage.removeItem('miningEndTime');
          localStorage.removeItem('lastRewardTime');
          localStorage.removeItem('lastRewardCalculation');
          
          setIsActive(false);
          
          toast({
            title: "Mining Complete",
            description: "Your 24-hour mining period has ended. You can start mining again tomorrow.",
          });
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isActive]);

  // Format time for display
  const formatTimeDisplay = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (rewardTimerRef.current) clearInterval(rewardTimerRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-20 h-20 rounded-full bg-game-pink opacity-10 animate-float"></div>
        <div className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full bg-game-blue opacity-10 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[15%] left-[20%] w-24 h-24 rounded-full bg-game-green opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[25%] right-[10%] w-16 h-16 rounded-full bg-game-purple opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="absolute inset-0 crypto-grid opacity-20"></div>
      </div>
      
      {/* Top navigation bar */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-between items-center px-6">
        <div className="glass rounded-full px-5 py-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <div>
            <span className="font-bold text-white">Balance: </span>
            <span className="ml-2 text-xl font-bold text-game-yellow">{user?.gct} GCT</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            onClick={() => navigate('/leaderboard')} 
            variant="outline"
            className="glass rounded-full text-white border-game-blue hover:bg-game-blue/20"
          >
            <BarChart4 size={18} className="mr-2" /> Leaderboard
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

      {/* Main content */}
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-12">
        <div className="glass p-8 rounded-2xl max-w-lg w-full">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">GCT Mining</h1>
          
          {isActive ? (
            <>
              <div className="bg-black/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="text-game-yellow mr-2" size={24} />
                  <h2 className="text-2xl font-bold text-white">Mining Active</h2>
                </div>
                
                {/* Next reward countdown */}
                <div className="flex flex-col items-center mb-6">
                  <p className="text-white text-center mb-2">Next GCT reward in:</p>
                  <div className="text-3xl font-bold text-game-green">{nextRewardTime}s</div>
                  <Progress 
                    value={((5 - nextRewardTime) / 5) * 100} 
                    className="h-2 w-full mt-2 bg-white/10" 
                    indicatorClassName="bg-gradient-to-r from-game-green to-game-blue" 
                  />
                </div>
                
                {/* Mining time remaining */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <Clock className="text-game-blue mr-2" size={20} />
                    <p className="text-white">Mining time remaining:</p>
                  </div>
                  <div className="text-3xl font-bold text-game-blue mb-2">
                    {formatTimeDisplay(remainingTime)}
                  </div>
                  <Progress 
                    value={(remainingTime / (24 * 60 * 60)) * 100} 
                    className="h-2 w-full bg-white/10" 
                    indicatorClassName="bg-gradient-to-r from-game-purple to-game-blue" 
                  />
                </div>
              </div>
              
              <div className="text-center text-white">
                <p className="mb-4">Your mining operation is active and will continue for the time shown above.</p>
                <p className="font-bold">You will receive 1 GCT every 5 seconds, even when offline.</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-game-yellow to-game-orange animate-pulse opacity-30"></div>
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-game-yellow to-game-orange flex items-center justify-center">
                    <Trophy size={64} className="text-white" />
                  </div>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-center text-white">
                Start mining GCT tokens automatically. You'll earn 1 GCT every 5 seconds for 24 hours straight!
              </p>
              
              <Button
                onClick={startMining}
                className="bg-gradient-to-r from-game-green to-game-blue text-white text-xl px-8 py-6 rounded-full shadow-lg animate-pulse-scale w-full"
              >
                <Sparkles size={24} className="mr-2" /> Start Mining
              </Button>
              
              <div className="mt-6 text-center text-white text-sm opacity-80">
                <p>You can only start mining once per day</p>
                <p>Mining will continue even when you're offline!</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
