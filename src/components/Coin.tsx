
import { useEffect, useState } from 'react';

interface CoinProps {
  coin: {
    id: string;
    x: number;
    y: number;
    duration: number;
    isSpecial: boolean;
    size: number;
    collected: boolean;
  };
  onClick: () => void;
}

export const Coin: React.FC<CoinProps> = ({ coin, onClick }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    if (coin.collected && !isCollected) {
      setIsCollected(true);
    }
  }, [coin.collected, isCollected]);

  const handleClick = () => {
    if (!isCollected) {
      setIsCollected(true);
      onClick();
    }
  };

  // Generate random rotation for the coin
  const rotation = Math.floor(Math.random() * 360);
  
  // Generate random shine positions for 3D effect
  const shinePositionFront = `${Math.random() * 100}% ${Math.random() * 100}%`;
  const shinePositionBack = `${Math.random() * 100}% ${Math.random() * 100}%`;

  // For special coins, determine a horizontal starting position and movement pattern
  const specialCoinStyles = coin.isSpecial ? {
    top: `${Math.random() * 70 + 10}vh`, // Random vertical position between 10-80% of viewport height
    left: '-100px', // Start from left outside the screen
    animationName: 'horizontal-fall', // Custom animation for horizontal movement
    animationDuration: `${coin.duration}s`,
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards'
  } : {};

  // Calculate a slightly randomized spin duration for more natural appearance
  const spinDuration = coin.isSpecial ? 3.5 + Math.random() * 1.5 : 2.5 + Math.random() * 1.5;

  // Create a combined style object with all properties
  const coinStyle = {
    '--fall-duration': `${coin.duration}s`,
    left: coin.isSpecial ? 'auto' : `${coin.x}px`,
    top: coin.isSpecial ? 'auto' : '0px', // Non-special coins start at the top
    width: `${coin.size}px`,
    height: `${coin.size}px`,
    pointerEvents: isCollected ? 'none' as const : 'auto' as const,
    ...specialCoinStyles
  };

  return (
    <div
      className={`coin perspective ${isCollected ? 'animate-collect' : coin.isSpecial ? 'special-coin' : 'animate-fall'} ${
        coin.isSpecial ? 'special-coin' : ''
      }`}
      style={coinStyle as React.CSSProperties}
      onClick={handleClick}
    >
      <div
        className={`coin-inner preserve-3d ${isSpinning ? 'animate-spin-slow' : ''}`}
        style={{ animationDuration: `${spinDuration}s` }}
      >
        {/* Front face of coin */}
        <div
          className={`coin-face coin-front flex items-center justify-center ${
            coin.isSpecial ? 'bg-game-yellow' : 'bg-game-orange'
          }`}
          style={{ 
            transform: `rotateY(0deg) rotate(${rotation}deg) translateZ(2px)`,
            boxShadow: coin.isSpecial 
              ? '0 0 10px rgba(224, 175, 104, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.8)' 
              : '0 0 5px rgba(255, 158, 100, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.5)',
            border: coin.isSpecial ? '2px solid #FFD700' : '1px solid #FFA07A',
            background: coin.isSpecial 
              ? `radial-gradient(circle at ${shinePositionFront}, rgba(255,255,255,0.9) 0%, #E0AF68 40%, #D4A456 100%)` 
              : `radial-gradient(circle at ${shinePositionFront}, rgba(255,255,255,0.8) 0%, #FF9E64 40%, #E88E54 100%)`
          }}
        >
          <div className="text-white font-bold text-center drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">
            {coin.isSpecial ? (
              <div className="flex flex-col items-center justify-center">
                <span className="text-sm">GCT</span>
                <span>25</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs">GCT</span>
                <span>1</span>
              </div>
            )}
          </div>
        </div>

        {/* Back face of coin */}
        <div
          className={`coin-face coin-back flex items-center justify-center ${
            coin.isSpecial ? 'bg-game-yellow' : 'bg-game-orange'
          }`}
          style={{ 
            transform: `rotateY(180deg) rotate(${rotation}deg) translateZ(2px)`,
            boxShadow: coin.isSpecial 
              ? '0 0 10px rgba(224, 175, 104, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.8)' 
              : '0 0 5px rgba(255, 158, 100, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.5)',
            border: coin.isSpecial ? '2px solid #FFD700' : '1px solid #FFA07A',
            background: coin.isSpecial 
              ? `radial-gradient(circle at ${shinePositionBack}, rgba(255,255,255,0.9) 0%, #E0AF68 40%, #D4A456 100%)` 
              : `radial-gradient(circle at ${shinePositionBack}, rgba(255,255,255,0.8) 0%, #FF9E64 40%, #E88E54 100%)`
          }}
        >
          <span className="text-white font-bold text-center drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]">GCT</span>
        </div>
        
        {/* Enhanced edge effects - more pronounced and multidimensional */}
        <div className="absolute inset-0 rounded-full coin-edge-main" style={{
          transform: 'translateZ(0)',
          background: coin.isSpecial 
            ? 'linear-gradient(to right, #C8A95C, #FFD700, #E0AF68, #FFD700, #C8A95C)' 
            : 'linear-gradient(to right, #D47F3C, #FF9E64, #E88E54, #FF9E64, #D47F3C)',
          border: coin.isSpecial ? '1px solid #C8A95C' : '1px solid #D47F3C',
          opacity: 0.8,
          zIndex: -1
        }}></div>
        
        {/* Top edge highlights */}
        <div className="absolute rounded-full overflow-hidden" style={{
          transform: 'rotateX(90deg)',
          height: '4px',
          width: '92%',
          top: '1px',
          left: '4%',
          background: coin.isSpecial 
            ? 'linear-gradient(to right, #8E9196, #FFD700, #8E9196)' 
            : 'linear-gradient(to right, #8E9196, #FF9E64, #8E9196)',
          opacity: 0.7,
          zIndex: -1
        }}></div>
        
        {/* Bottom edge shadow */}
        <div className="absolute rounded-full overflow-hidden" style={{
          transform: 'rotateX(90deg)',
          height: '4px',
          width: '92%',
          bottom: '1px',
          left: '4%',
          background: coin.isSpecial 
            ? 'linear-gradient(to right, #333, #D4A456, #333)' 
            : 'linear-gradient(to right, #333, #E88E54, #333)',
          opacity: 0.7,
          zIndex: -1
        }}></div>
        
        {/* Left edge highlights */}
        <div className="absolute rounded-full overflow-hidden" style={{
          transform: 'rotateY(90deg)',
          width: '4px',
          height: '92%',
          left: '1px',
          top: '4%',
          background: coin.isSpecial 
            ? 'linear-gradient(to bottom, #8E9196, #FFD700, #8E9196)' 
            : 'linear-gradient(to bottom, #8E9196, #FF9E64, #8E9196)',
          opacity: 0.7,
          zIndex: -1
        }}></div>
        
        {/* Right edge shadow */}
        <div className="absolute rounded-full overflow-hidden" style={{
          transform: 'rotateY(90deg)',
          width: '4px',
          height: '92%',
          right: '1px',
          top: '4%',
          background: coin.isSpecial 
            ? 'linear-gradient(to bottom, #333, #D4A456, #333)' 
            : 'linear-gradient(to bottom, #333, #E88E54, #333)',
          opacity: 0.7,
          zIndex: -1
        }}></div>
        
        {/* Light reflection on edges while spinning - creates the illusion of light catching the edge */}
        <div className="absolute inset-0 rounded-full overflow-hidden coin-shine" style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
          opacity: 0.3,
          mixBlendMode: 'overlay',
          animation: 'shine-sweep 2s linear infinite',
          zIndex: 1
        }}></div>
      </div>
    </div>
  );
};
