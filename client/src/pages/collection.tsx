import { useState, useEffect } from "react";
import { loadGameState, GameState } from "@/lib/game-state";
import { ITEMS } from "@/lib/items";
import Navigation from "@/components/navigation";

export default function Collection() {
  const [gameState, setGameState] = useState<GameState>(loadGameState());

  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'rarity-common';
      case 'rare': return 'rarity-rare';
      case 'epic': return 'rarity-epic';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen album-bg pb-20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur p-4 shadow-lg">
        <h1 className="font-display text-2xl font-bold text-ocean-700 text-center">
          <span className="mr-2">📖</span>
          Collection Album
        </h1>
        <div className="flex justify-center mt-2">
          <div className="bg-yellow-100 px-4 py-2 rounded-full">
            <span className="text-yellow-800 font-semibold">
              {gameState.collectedItems.length}/28 collected
            </span>
          </div>
        </div>
      </div>
      
      {/* Collection Grid */}
      <div className="p-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg">
          <div className="grid grid-cols-4 gap-3 collection-grid">
            {ITEMS.map(item => {
              const isCollected = gameState.collectedItems.includes(item.id);
              
              return (
                <div
                  key={item.id}
                  className={`${getRarityClass(item.rarity)} rounded-lg p-3 text-center aspect-square flex flex-col justify-center transition-all duration-300 ${
                    isCollected ? 'collected opacity-100' : 'not-collected opacity-30 grayscale'
                  }`}
                >
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xs font-semibold text-gray-700">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 bg-white/90 backdrop-blur rounded-xl p-4">
          <h3 className="font-display text-lg font-semibold text-gray-700 mb-3">Rarity Guide</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded rarity-common"></div>
              <span className="text-sm text-gray-600">Common (3x drop rate)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded rarity-rare"></div>
              <span className="text-sm text-gray-600">Rare (2x drop rate)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded rarity-epic"></div>
              <span className="text-sm text-gray-600">Epic (1x drop rate)</span>
            </div>
          </div>
        </div>
      </div>

      <Navigation currentScreen="collection" />
    </div>
  );
}
