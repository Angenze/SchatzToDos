import { useState } from "react";
import { useLocation } from "wouter";
import { saveGameState, loadGameState } from "@/lib/game-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Opening() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");

  const startGame = () => {
    if (!username.trim()) {
      alert("Please enter your name to continue!");
      return;
    }

    const gameState = loadGameState();
    gameState.username = username.trim();
    saveGameState(gameState);
    
    navigate("/todo");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      startGame();
    }
  };

  return (
    <div className="min-h-screen ocean-bg flex flex-col justify-center items-center p-6 text-white relative overflow-hidden">
      {/* Ocean waves background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-32">
            <path 
              d="M0,96L40,90.7C80,85,160,75,240,80C320,85,400,107,480,122.7C560,139,640,149,720,144C800,139,880,117,960,106.7C1040,96,1120,96,1160,96L1200,96L1200,120L1160,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z" 
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </div>
      </div>
      
      <div className="text-center z-10">
        <div className="mb-8">
          <div className="text-8xl animate-float">⚓</div>
        </div>
        
        <h1 className="font-display text-5xl font-bold mb-4 text-shadow">Ocean Quest</h1>
        <p className="text-xl mb-8 text-blue-100">Complete your daily tasks and discover treasures from the deep!</p>
        
        <div className="bg-white/90 backdrop-blur rounded-2xl p-6 mx-4 max-w-sm">
          <h2 className="font-display text-2xl font-semibold text-gray-700 mb-4">Welcome, Explorer!</h2>
          <p className="text-gray-600 mb-4">Enter your name to begin your ocean adventure</p>
          
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Your name..."
            className="w-full p-4 border-2 border-ocean-200 rounded-xl text-lg font-medium focus:border-ocean-500 focus:outline-none transition-colors mb-4 text-gray-700"
            maxLength={20}
          />
          
          <Button 
            onClick={startGame}
            disabled={!username.trim()}
            className={`w-full font-semibold py-4 px-6 rounded-xl transition-colors text-lg shadow-lg ${
              username.trim() 
                ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="mr-2">⚓</span>
            Start Adventure
          </Button>
        </div>
      </div>
    </div>
  );
}
