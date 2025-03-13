
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

// Mock data for the chart
const generateChartData = () => {
  const data = [];
  const baseValue = 1000 + Math.random() * 1000;
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(100, baseValue + Math.sin(i / 5) * 400 + Math.random() * 200),
    });
  }
  
  return data;
};

const config = {
  value: {
    label: "GCT Price",
    color: "#E0AF68",
  },
};

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(generateChartData());

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...chartData];
      const lastValue = newData[newData.length - 1].value;
      const change = (Math.random() - 0.5) * 50;
      
      newData[newData.length - 1].value = Math.max(100, lastValue + change);
      setChartData(newData);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [chartData]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[5%] w-20 h-20 rounded-full bg-game-pink opacity-10 animate-float"></div>
        <div className="absolute top-[30%] right-[15%] w-32 h-32 rounded-full bg-game-blue opacity-10 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-[15%] left-[20%] w-24 h-24 rounded-full bg-game-green opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[25%] right-[10%] w-16 h-16 rounded-full bg-game-purple opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Cryptocurrency style background elements */}
        <div className="absolute top-[50%] left-[50%] w-96 h-96 rounded-full border border-game-yellow/20 opacity-30"></div>
        <div className="absolute top-[50%] left-[50%] w-72 h-72 rounded-full border border-game-green/20 opacity-30"></div>
        <div className="absolute top-[50%] left-[50%] w-48 h-48 rounded-full border border-game-blue/20 opacity-30"></div>
        
        {/* Blockchain grid background */}
        <div className="absolute inset-0 crypto-grid opacity-20"></div>
        
        {/* Floating binary and hexadecimal numbers */}
        <div className="absolute top-[15%] left-[25%] text-xs text-game-green/30">0x7F3A92B1</div>
        <div className="absolute top-[40%] right-[30%] text-xs text-game-blue/30">10110101</div>
        <div className="absolute bottom-[35%] left-[40%] text-xs text-game-yellow/30">0xE94D781C</div>
        <div className="absolute top-[65%] right-[15%] text-xs text-game-pink/30">11001010</div>
        
        {/* Connected nodes visualization */}
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

      {/* User balance */}
      {user && (
        <div className="absolute top-4 left-4 z-50">
          <div className="glass rounded-full px-5 py-2">
            <span className="font-bold text-white">Your Balance: </span>
            <span className="ml-2 text-xl font-bold text-game-yellow">{user.gct} GCT</span>
          </div>
        </div>
      )}

      <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen py-12 page-transition">
        <div className="perspective-500 mb-12">
          <div className="preserve-3d animate-spin-slow">
            <div className="relative w-32 h-32 rounded-full" style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, #E0AF68 25%, #D4A456 100%)",
              boxShadow: "0 0 20px rgba(224, 175, 104, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.8)"
            }}>
              {/* Coin front face */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center preserve-3d backface-hidden" 
                style={{ transform: "translateZ(2px)" }}>
                <span className="text-white font-bold text-2xl drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">GCT</span>
              </div>
              
              {/* Coin back face */}
              <div className="absolute inset-0 rounded-full flex items-center justify-center preserve-3d backface-hidden" 
                style={{ 
                  transform: "rotateY(180deg) translateZ(2px)",
                  background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.9) 0%, #E0AF68 25%, #D4A456 100%)"
                }}>
                <span className="text-white font-bold text-2xl drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">GCT</span>
              </div>
              
              {/* Coin edge */}
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
          Mine GCT tokens by catching them as they drop. Build your crypto balance and climb the leaderboard!
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

        {/* Price chart section */}
        <div className="glass rounded-xl p-6 max-w-2xl w-full mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">GCT Price Chart</h2>
          <div className="h-64">
            <ChartContainer className="h-full" config={config}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#E0AF68"
                  strokeWidth={2}
                  dot={{ stroke: "#E0AF68", strokeWidth: 2, fill: "#E0AF68", r: 3 }}
                  activeDot={{ stroke: "#FFD700", strokeWidth: 2, fill: "#FFD700", r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-6 max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">How To Mine GCT</h2>
          <ul className="list-disc pl-6 space-y-2 text-white">
            <li>GCT tokens will fall randomly from the top of the screen</li>
            <li>Click on tokens to mine them before they disappear</li>
            <li>Regular tokens are worth 1 GCT</li>
            <li>Rare golden tokens (1% chance) are worth 25 GCT!</li>
            <li>Each mining session lasts 60 seconds</li>
            <li>5-minute cooldown between mining sessions</li>
            <li>Compete with other miners to reach the top of the leaderboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
