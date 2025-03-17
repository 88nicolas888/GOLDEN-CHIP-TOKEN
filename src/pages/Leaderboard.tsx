
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  walletAddress: string;
  username: string;
  gct: number;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPlayersShown = 100;

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
        
        const users: Record<string, { walletAddress: string; username: string; gct: number }> = JSON.parse(usersData);
        
        // Convert to array and sort by GCT (descending)
        const leaderboardData: LeaderboardUser[] = Object.entries(users)
          .map(([id, userData]) => ({
            id,
            walletAddress: userData.walletAddress,
            username: userData.username || `User_${id.substring(0, 6)}`, // Fallback for users without username
            gct: userData.gct,
          }))
          .sort((a, b) => b.gct - a.gct);
        
        // Only keep top 100 players
        const top100Players = leaderboardData.slice(0, maxPlayersShown);
        setLeaderboard(top100Players);
        
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

  // Calculate pagination values
  const totalPages = Math.ceil(Math.min(leaderboard.length, maxPlayersShown) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, leaderboard.length);
  const currentPageData = leaderboard.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-poker-felt p-6 page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Leaderboard <span className="text-lg font-normal">(Top 100)</span></h1>
          <div className="flex space-x-3">
            <Button 
              onClick={() => navigate('/game')} 
              className="bg-poker-red text-white rounded-full"
            >
              Play Game
            </Button>
            <Button 
              onClick={() => navigate('/home')} 
              variant="outline"
              className="rounded-full text-white border-white/30 hover:bg-white/10"
            >
              Home
            </Button>
          </div>
        </div>
        
        {user && userRank !== null && (
          <div className="poker-card rounded-xl p-4 mb-6 animate-fade-in">
            <p className="text-lg text-poker-black">
              <span className="font-medium">Your rank:</span>{' '}
              <span className="font-bold">#{userRank}</span> with{' '}
              <span className="font-bold">{user.gct} GCT</span>
            </p>
          </div>
        )}
        
        <div className="bg-white/95 rounded-xl shadow-lg overflow-hidden poker-card">
          <div className="p-4 bg-gradient-to-r from-poker-red to-poker-gold text-white">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 font-bold text-center">Rank</div>
              <div className="col-span-6 font-bold">Player</div>
              <div className="col-span-4 font-bold text-right">GCT Balance</div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-20">
              <div className="animate-pulse-scale">
                <div className="w-16 h-16 rounded-full bg-poker-red opacity-75"></div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-poker-gold/20">
              {leaderboard.length === 0 ? (
                <div className="p-10 text-center text-poker-gray">
                  No players on the leaderboard yet. Be the first!
                </div>
              ) : (
                currentPageData.map((player, index) => {
                  const globalRank = startIndex + index + 1;
                  return (
                    <div 
                      key={player.id} 
                      className={`grid grid-cols-12 gap-4 p-4 hover:bg-poker-gold/5 transition-colors ${
                        player.id === user?.id ? 'bg-poker-felt/10' : ''
                      }`}
                    >
                      <div className="col-span-2 text-center">
                        {globalRank === 1 && (
                          <span className="text-xl text-yellow-500">🏆</span>
                        )}
                        {globalRank === 2 && (
                          <span className="text-xl text-gray-400">🥈</span>
                        )}
                        {globalRank === 3 && (
                          <span className="text-xl text-amber-700">🥉</span>
                        )}
                        {globalRank > 3 && (
                          <span className="font-semibold text-black">#{globalRank}</span>
                        )}
                      </div>
                      <div className="col-span-6 font-medium text-black">
                        <span className="font-semibold">{player.username}</span>
                        {player.id === user?.id && (
                          <span className="ml-2 text-xs bg-poker-red text-white px-2 py-0.5 rounded-full">You</span>
                        )}
                      </div>
                      <div className="col-span-4 text-right font-bold text-black">
                        {player.gct.toLocaleString()} GCT
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
          
          {/* Pagination controls */}
          {!isLoading && leaderboard.length > 0 && totalPages > 1 && (
            <div className="p-4 border-t border-poker-gold/20">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
