import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Opening from "@/pages/opening";
import Todo from "@/pages/todo";
import Treasure from "@/pages/treasure";
import Collection from "@/pages/collection";
import Final from "@/pages/final";
import { useEffect, useState } from "react";
import { loadGameState, GameState, dailyReset } from "@/lib/game-state";

function Router() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const state = loadGameState();
    
    // Check for daily reset
    const today = new Date().toDateString();
    if (state.lastResetDate !== today) {
      const resetState = dailyReset(state);
      setGameState(resetState);
    } else {
      setGameState(state);
    }

    // Schedule daily reset at midnight
    const scheduleNextReset = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();
      
      setTimeout(() => {
        const currentState = loadGameState();
        const resetState = dailyReset(currentState);
        setGameState(resetState);
        scheduleNextReset();
      }, timeUntilMidnight);
    };
    
    scheduleNextReset();
  }, []);

  if (!gameState) {
    return <div className="min-h-screen bg-ocean-500 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>;
  }

  return (
    <Switch>
      <Route path="/" component={gameState.collectedItems.length === 28 ? Final : (!gameState.username ? Opening : Todo)} />
      <Route path="/todo" component={Todo} />
      <Route path="/treasure" component={Treasure} />
      <Route path="/collection" component={Collection} />
      <Route path="/final" component={Final} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
