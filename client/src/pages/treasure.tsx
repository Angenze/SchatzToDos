import { useState, useEffect } from "react";
import { loadGameState, saveGameState, GameState } from "@/lib/game-state";
import { ITEMS, getRandomItem, Item } from "@/lib/items";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";

export default function Treasure() {
  const [gameState, setGameState] = useState<GameState>(loadGameState());
  const [discoveredItem, setDiscoveredItem] = useState<Item | null>(null);
  const [message, setMessage] = useState<{ text: string; type: string } | null>(null);
  const [, navigate] = useLocation();

  const allCompleted = gameState.todos.length > 0 && gameState.todos.every(t => t.completed);

  const showMessage = (text: string, type: string) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const openTreasure = () => {
    // Check if already opened today
    if (gameState.treasureOpenedToday) {
      showMessage('Come back tomorrow for a new treasure! 🌅', 'warning');
      return;
    }
    
    // Check if all todos are completed
    if (!allCompleted) {
      showMessage('You need the key. Complete all ToDos! 🗝️', 'error');
      return;
    }
    
    // Open treasure and get random item
    const randomItem = getRandomItem(gameState.collectedItems);
    if (randomItem && !gameState.collectedItems.includes(randomItem.id)) {
      const newState = {
        ...gameState,
        collectedItems: [...gameState.collectedItems, randomItem.id],
        treasureOpenedToday: true
      };
      
      setGameState(newState);
      saveGameState(newState);
      setDiscoveredItem(randomItem);
      
      // Check if collection is complete
      if (newState.collectedItems.length === ITEMS.length) {
        setTimeout(() => {
          navigate('/final');
        }, 3000);
      }
    } else {
      showMessage('The treasure chest is empty! Try again tomorrow. 📦', 'info');
    }
  };

  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'rarity-common';
      case 'rare': return 'rarity-rare';
      case 'epic': return 'rarity-epic';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen beach-bg pb-20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur p-4 shadow-lg">
        <h1 className="font-display text-2xl font-bold text-ocean-700 text-center">
          <span className="mr-2">🗺️</span>
          Treasure Beach
        </h1>
      </div>
      
      {/* Beach Scene */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 relative min-h-[80vh]">
        {/* Beach decorations */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-sand-200 rounded-t-full opacity-60"></div>
        
        {/* Palm trees decoration */}
        <div className="absolute top-10 left-4">
          <div className="text-4xl text-green-600 opacity-40 transform rotate-12">🌴</div>
        </div>
        <div className="absolute top-20 right-6">
          <div className="text-5xl text-green-700 opacity-30 transform -rotate-6">🌴</div>
        </div>
        
        {/* Treasure Chest */}
        <div className="text-center z-10">
          <div className="mb-6">
            <div 
              className={`treasure-chest mx-auto animate-float cursor-pointer transition-all duration-300 hover:scale-105 ${
                allCompleted && !gameState.treasureOpenedToday ? 'unlocked' : ''
              } ${gameState.treasureOpenedToday ? 'cursor-not-allowed' : ''}`}
              onClick={openTreasure}
            >
              <div className="text-2xl">
                {allCompleted && !gameState.treasureOpenedToday ? '✨' : '🔒'}
              </div>
            </div>
          </div>
          
          <h2 className="font-display text-3xl font-bold text-white mb-4 text-shadow">
            Mysterious Treasure Chest
          </h2>
          
          <p className="text-white/90 text-lg mb-6 max-w-sm mx-auto">
            Complete all your daily tasks to unlock the treasure and discover what lies within!
          </p>
          
          {/* Error/Success Messages */}
          {message && (
            <div className={`bg-white/90 backdrop-blur rounded-xl p-4 mx-4 ${
              message.type === 'error' ? 'border-l-4 border-red-500' :
              message.type === 'warning' ? 'border-l-4 border-yellow-500' :
              message.type === 'success' ? 'border-l-4 border-green-500' :
              'border-l-4 border-blue-500'
            }`}>
              <p className="text-gray-700 font-semibold">{message.text}</p>
            </div>
          )}
          
          {/* Discovered Item */}
          {discoveredItem && (
            <div className="bg-white/95 backdrop-blur rounded-2xl p-6 mx-4 mt-6">
              <h3 className="font-display text-xl font-bold text-ocean-700 mb-3">
                <span className="mr-2">🎁</span>
                You discovered:
              </h3>
              <div className="text-center">
                <div className={`${getRarityClass(discoveredItem.rarity)} rounded-xl p-4 mx-auto max-w-xs`}>
                  <div className="text-4xl mb-2">{discoveredItem.emoji}</div>
                  <h4 className="font-display text-xl font-bold text-gray-800">{discoveredItem.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{discoveredItem.rarity}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Navigation currentScreen="treasure" />
    </div>
  );
}
