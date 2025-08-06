import { Button } from "@/components/ui/button";

export default function Final() {
  const resetGame = () => {
    localStorage.removeItem('oceanQuestGameState');
    window.location.reload();
  };

  return (
    <div className="min-h-screen ocean-bg flex flex-col justify-center items-center p-6 text-white relative overflow-hidden">
      {/* Celebration effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-yellow-300 text-4xl animate-bounce">✨</div>
        <div className="absolute top-1/3 right-1/4 text-yellow-300 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>⭐</div>
        <div className="absolute bottom-1/3 left-1/3 text-yellow-300 text-5xl animate-bounce" style={{animationDelay: '1s'}}>🎉</div>
        <div className="absolute top-1/2 right-1/3 text-yellow-300 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>✨</div>
      </div>
      
      <div className="text-center z-10">
        {/* Scroll background */}
        <div className="bg-amber-50 border-4 border-amber-800 rounded-lg p-8 mx-4 shadow-2xl transform rotate-1 relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-amber-800 rounded-full"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-800 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-800 rounded-full"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-800 rounded-full"></div>
          
          <div className="text-amber-900">
            <h1 className="font-display text-4xl font-bold mb-4">🏆 Hurray! 🏆</h1>
            <h2 className="font-display text-2xl font-semibold mb-4">You did it!</h2>
            <p className="text-lg mb-6">You've collected every treasure from the ocean depths. You're a true Ocean Quest Master!</p>
            
            <div className="text-6xl mb-6">🐙🐠🦈🦞🐚</div>
            
            <Button 
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-colors text-lg shadow-lg"
            >
              <span className="mr-2">🔄</span>
              Start New Adventure
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
