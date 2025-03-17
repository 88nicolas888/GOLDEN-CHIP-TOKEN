
import { Link } from "react-router-dom";
import { ArrowLeft, Wallet, BarChart4, Coins, Clock, Globe, Lock } from "lucide-react";
import Percent90 from "@/components/icons/Percent90";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const AboutGCT = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Blockchain style background */}
      <div className="absolute inset-0 z-0 crypto-grid opacity-20"></div>
      
      {/* Floating blockchain elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-32 h-32 rounded-full border border-game-blue/30 animate-float opacity-30"></div>
        <div className="absolute top-[30%] right-[20%] w-48 h-48 rounded-full border border-game-green/30 animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[15%] left-[15%] w-40 h-40 rounded-full border border-game-purple/30 animate-float opacity-30" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Blockchain "cubes" */}
        <div className="absolute top-[20%] left-[20%] w-10 h-10 bg-game-blue/20 rotate-45 animate-float" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-[50%] right-[15%] w-8 h-8 bg-game-green/20 rotate-45 animate-float" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute bottom-[30%] right-[25%] w-12 h-12 bg-game-yellow/20 rotate-45 animate-float" style={{ animationDelay: '1.2s' }}></div>
      </div>
      
      {/* Header with navigation */}
      <header className="relative z-10 pt-6 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center text-white hover:text-game-blue transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back</span>
            </Link>
            
            {!user && (
              <Link to="/">
                <Button className="bg-gradient-to-r from-game-blue to-game-purple rounded-full">
                  <Wallet size={18} className="mr-2" />
                  Connect Wallet
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="text-center mb-16">
            <div className="perspective mx-auto mb-8">
              {/* Enhanced 3D Coin */}
              <div className="relative w-32 h-32 mx-auto preserve-3d animate-coin-spin-3d">
                {/* Coin front face */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 backface-hidden"
                  style={{
                    transform: 'translateZ(5px)',
                    boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 200, 0, 0.5)'
                  }}>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white font-bold text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">GCT</div>
                  </div>
                </div>
                
                {/* Coin back face */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-amber-700 backface-hidden"
                  style={{
                    transform: 'rotateY(180deg) translateZ(5px)',
                    boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 200, 0, 0.5)'
                  }}>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white font-bold text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">GCT</div>
                  </div>
                </div>
                
                {/* Coin edge */}
                <div className="absolute inset-0 rounded-full"
                  style={{
                    transform: 'rotateY(90deg)',
                    background: 'linear-gradient(to bottom, #FFD700, #B8860B)',
                    width: '10px',
                    left: 'calc(50% - 5px)',
                    boxShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
                  }}></div>
                  
                {/* More coin edges for realistic 3D effect */}
                <div className="absolute inset-0 rounded-full"
                  style={{
                    transform: 'rotateX(90deg)',
                    background: 'linear-gradient(to right, #FFD700, #B8860B, #FFD700)',
                    height: '10px',
                    top: 'calc(50% - 5px)',
                    boxShadow: '0 0 5px rgba(255, 215, 0, 0.8)'
                  }}></div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              GCT Token
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              The next generation mining token on the blockchain. Earn GCT automatically with our unique mining algorithm.
            </p>
          </div>
          
          {/* Features section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="crypto-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-game-blue/20 p-3 rounded-full">
                    <Clock className="text-game-blue h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fast Mining Rate</h3>
                    <p className="text-gray-300">
                      Earn 1 GCT token every 5 seconds with our automatic mining system. No complex hardware required.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="crypto-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-game-green/20 p-3 rounded-full">
                    <Percent90 className="text-game-green h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">90% Airdrop</h3>
                    <p className="text-gray-300">
                      90% of the total GCT supply will be distributed via airdrops to early adopters and active wallet addresses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="crypto-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-game-purple/20 p-3 rounded-full">
                    <Globe className="text-game-purple h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">24/7 Mining</h3>
                    <p className="text-gray-300">
                      Your mining operation continues even when you're offline. Automatically earn tokens around the clock.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="crypto-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 bg-game-yellow/20 p-3 rounded-full">
                    <BarChart4 className="text-game-yellow h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Compete on Leaderboard</h3>
                    <p className="text-gray-300">
                      See how your mining operation stacks up against other miners on our real-time leaderboard.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tokenomics section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">GCT Tokenomics</h2>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center mb-8">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold mb-4">Token Distribution</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-4 h-4 bg-game-yellow rounded-full mr-2"></div>
                      <span>90% - Community Airdrop</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 bg-game-blue rounded-full mr-2"></div>
                      <span>5% - Development Fund</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 bg-game-green rounded-full mr-2"></div>
                      <span>3% - Marketing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 bg-game-purple rounded-full mr-2"></div>
                      <span>2% - Team</span>
                    </li>
                  </ul>
                </div>
                
                <div className="md:w-1/2">
                  <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                    {/* Simple pie chart visualization */}
                    <div className="absolute inset-0 rounded-full bg-game-yellow" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)' }}></div>
                    <div className="absolute inset-0 rounded-full bg-game-blue" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 95% 100%, 95% 95%, 100% 95%)' }}></div>
                    <div className="absolute inset-0 rounded-full bg-game-green" style={{ clipPath: 'polygon(50% 50%, 95% 95%, 93% 98%, 90% 98%)' }}></div>
                    <div className="absolute inset-0 rounded-full bg-game-purple" style={{ clipPath: 'polygon(50% 50%, 90% 98%, 88% 100%, 85% 100%)' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[60%] h-[60%] rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="font-bold">GCT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Mining Mechanics</h3>
                <p>
                  The GCT mining system is designed to be accessible to everyone. Each wallet address can mine 1 GCT token every 5 seconds, with mining sessions running for 24 hours once activated. This ensures a fair distribution and prevents any single entity from dominating the token supply.
                </p>
                <p>
                  Mining rewards are calculated and distributed automatically, even when you're offline, making it easy for anyone to participate in the GCT ecosystem regardless of technical expertise.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to start mining GCT?</h2>
            <p className="text-xl mb-8">
              Connect your wallet now and begin earning GCT tokens automatically every 5 seconds.
            </p>
            
            <Link to="/">
              <Button className="bg-gradient-to-r from-game-green to-game-blue text-white text-lg px-8 py-6 rounded-full shadow-lg hover:opacity-90">
                Start Mining Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGCT;
