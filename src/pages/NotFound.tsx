
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-game-background page-transition">
      <div className="text-center glass p-10 rounded-2xl max-w-md">
        <div className="perspective mb-8">
          <div className="preserve-3d animate-spin-slow">
            <div className="relative w-24 h-24 rounded-full bg-game-pink shadow-lg flex items-center justify-center text-white font-bold text-2xl mx-auto">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The coin you're looking for has fallen out of view.
        </p>
        
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={() => navigate('/')} 
            className="btn-hover bg-gradient-to-r from-game-blue to-game-purple text-white py-5 rounded-full shadow-md"
          >
            Return to Home
          </Button>
          <Button 
            onClick={() => navigate('/game')} 
            variant="outline"
            className="rounded-full py-5"
          >
            Play Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
