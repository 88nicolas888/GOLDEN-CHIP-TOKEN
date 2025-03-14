
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
      >
        <div
          className={`coin-face coin-front flex items-center justify-center ${
            coin.isSpecial ? 'bg-game-yellow' : 'bg-game-orange'
          }`}
          style={{ 
            transform: `rotateY(0deg) rotate(${rotation}deg)`,
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
        <div
          className={`coin-face coin-back flex items-center justify-center ${
            coin.isSpecial ? 'bg-game-yellow' : 'bg-game-orange'
          }`}
          style={{ 
            transform: `rotateY(180deg) rotate(${rotation}deg)`,
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
        
        {/* Edge of the coin for 3D effect */}
        <div className="absolute inset-0 rounded-full z-[-1]" style={{
          transform: 'translateZ(-2px)',
          background: coin.isSpecial 
            ? 'linear-gradient(to right, #D4A456, #FFD700, #D4A456)' 
            : 'linear-gradient(to right, #E88E54, #FF9E64, #E88E54)',
          border: coin.isSpecial ? '1px solid #FFD700' : '1px solid #FFA07A',
        }}></div>
      </div>
    </div>
  );
};

