
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardUser {
  id: string;
  username: string;
  gct: number;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to get leaderboard data
    const getLeaderboard = () => {
      setIsLoading(true);
      
      try {
        // Get all users from local storage
        const usersData = localStorage.getItem('users');
        if (!usersData) {
          setLeaderboard([]);
          return;
        }
        
        const users: Record<string, { username: string; password: string; gct: number }> = JSON.parse(usersData);
        
        // Convert to array and sort by GCT (descending)
        const leaderboardData: LeaderboardUser[] = Object.entries(users)
          .map(([id, userData]) => ({
            id,
            username: userData.username,
            gct: userData.gct,
          }))
          .sort((a, b) => b.gct - a.gct);
        
        setLeaderboard(leaderboardData);
        
        // Find current user's rank
        if (user) {
          const rank = leaderboardData.findIndex((item) => item.id === user.id);
          setUserRank(rank !== -1 ? rank + 1 : null);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getLeaderboard();
    
    // Refresh leaderboard every 10 seconds
    const intervalId = setInterval(getLeaderboard, 10000);
    
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div className="min-h-screen bg-game-background p-6 page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <div className="flex space-x-3">
            <Button 
              onClick={() => navigate('/game')} 
              className="bg-game-green text-white rounded-full"
            >
              Play Game
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              className="rounded-full"
            >
              Home
            </Button>
          </div>
        </div>
        
        {user && userRank !== null && (
          <div className="glass rounded-xl p-4 mb-6 animate-fade-in">
            <p className="text-lg">
              <span className="font-medium">Your rank:</span>{' '}
              <span className="font-bold">#{userRank}</span> with{' '}
              <span className="font-bold">{user.gct} GCT</span>
            </p>
          </div>
        )}
        
        <div className="bg-white/90 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-game-blue to-game-purple text-white">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 font-bold text-center">Rank</div>
              <div className="col-span-6 font-bold">Username</div>
              <div className="col-span-4 font-bold text-right">GCT Balance</div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-20">
              <div className="animate-pulse-scale">
                <div className="w-16 h-16 rounded-full bg-primary opacity-75"></div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {leaderboard.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  No players on the leaderboard yet. Be the first!
                </div>
              ) : (
                leaderboard.slice(0, 100).map((player, index) => (
                  <div 
                    key={player.id} 
                    className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors ${
                      player.id === user?.id ? 'bg-game-background/30' : ''
                    }`}
                  >
                    <div className="col-span-2 text-center">
                      {index === 0 && (
                        <span className="text-xl text-yellow-500">🏆</span>
                      )}
                      {index === 1 && (
                        <span className="text-xl text-gray-400">🥈</span>
                      )}
                      {index === 2 && (
                        <span className="text-xl text-amber-700">🥉</span>
                      )}
                      {index > 2 && (
                        <span className="font-semibold text-black">#{index + 1}</span>
                      )}
                    </div>
                    <div className="col-span-6 font-medium uppercase text-black">
                      {player.username.toUpperCase()}
                      {player.id === user?.id && (
                        <span className="ml-2 text-xs bg-game-green text-white px-2 py-0.5 rounded-full">You</span>
                      )}
                    </div>
                    <div className="col-span-4 text-right font-bold text-black">
                      {player.gct.toLocaleString()} GCT
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
