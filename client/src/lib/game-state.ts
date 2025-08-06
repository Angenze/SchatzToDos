export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface GameState {
  username: string;
  todos: Todo[];
  collectedItems: number[];
  treasureOpenedToday: boolean;
  lastResetDate: string;
}

const defaultGameState: GameState = {
  username: '',
  todos: [],
  collectedItems: [],
  treasureOpenedToday: false,
  lastResetDate: new Date().toDateString()
};

export function loadGameState(): GameState {
  try {
    const saved = localStorage.getItem('oceanQuestGameState');
    if (saved) {
      return { ...defaultGameState, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Failed to load game state:', error);
  }
  return defaultGameState;
}

export function saveGameState(gameState: GameState): void {
  try {
    localStorage.setItem('oceanQuestGameState', JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function dailyReset(currentState: GameState): GameState {
  const resetState = {
    ...currentState,
    todos: [],
    treasureOpenedToday: false,
    lastResetDate: new Date().toDateString()
  };
  
  saveGameState(resetState);
  return resetState;
}
