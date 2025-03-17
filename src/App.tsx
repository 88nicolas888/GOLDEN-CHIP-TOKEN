
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import ConnectWallet from "./pages/ConnectWallet";
import AboutGCT from "./pages/AboutGCT";
import ProtectedRoute from "./components/ProtectedRoute";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Conditional redirect component that checks login status
const ConditionalRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  
  // If user is logged in, redirect to game, otherwise to connect wallet
  return user ? <Navigate to="/game" replace /> : <Navigate to="/connect" replace />;
};

// Wrap routes with AnimatePresence for transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Root path now redirects based on auth status */}
        <Route path="/" element={<ConditionalRedirect />} />
        
        {/* Connect wallet page */}
        <Route path="/connect" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ConnectWallet />
          </motion.div>
        } />
        
        {/* About GCT page - accessible to everyone */}
        <Route path="/home" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AboutGCT />
          </motion.div>
        } />
        
        {/* Game page - protected */}
        <Route 
          path="/game" 
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            </motion.div>
          } 
        />
        
        {/* Leaderboard page - protected */}
        <Route 
          path="/leaderboard" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            </motion.div>
          } 
        />
        
        {/* 404 page */}
        <Route path="*" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <NotFound />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
