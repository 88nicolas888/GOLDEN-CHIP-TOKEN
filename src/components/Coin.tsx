
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

  return (
    <div
      className={`coin perspective ${isCollected ? 'animate-collect' : 'animate-fall'} ${
        coin.isSpecial ? 'special-coin' : ''
      }`}
      style={{
        '--fall-duration': `${coin.duration}s`,
        left: `${coin.x}px`,
        top: '0px', // Ensure the coin starts at the top
        width: `${coin.size}px`,
        height: `${coin.size}px`,
        pointerEvents: isCollected ? 'none' : 'auto',
      } as React.CSSProperties}
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
            boxShadow: coin.isSpecial ? '0 0 10px rgba(224, 175, 104, 0.8)' : '0 0 5px rgba(255, 158, 100, 0.5)',
            border: coin.isSpecial ? '2px solid #FFD700' : '1px solid #FFA07A'
          }}
        >
          <span className="text-white font-bold text-center">
            {coin.isSpecial ? '25' : '1'}
          </span>
        </div>
        <div
          className={`coin-face coin-back flex items-center justify-center ${
            coin.isSpecial ? 'bg-game-yellow' : 'bg-game-orange'
          }`}
          style={{ 
            transform: `rotateY(180deg) rotate(${rotation}deg)`,
            boxShadow: coin.isSpecial ? '0 0 10px rgba(224, 175, 104, 0.8)' : '0 0 5px rgba(255, 158, 100, 0.5)',
            border: coin.isSpecial ? '2px solid #FFD700' : '1px solid #FFA07A'
          }}
        >
          <span className="text-white font-bold text-center">GCT</span>
        </div>
      </div>
    </div>
  );
};
