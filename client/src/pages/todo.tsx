import { useState, useEffect } from "react";
import { loadGameState, saveGameState, GameState, Todo as TodoType } from "@/lib/game-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import Navigation from "@/components/navigation";

export default function Todo() {
  const [gameState, setGameState] = useState<GameState>(loadGameState());
  const [todoInput, setTodoInput] = useState("");

  const addTodo = () => {
    if (!todoInput.trim()) {
      alert("Please enter a task!");
      return;
    }

    const newTodo: TodoType = {
      id: Date.now(),
      text: todoInput.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    const newState = {
      ...gameState,
      todos: [...gameState.todos, newTodo]
    };

    setGameState(newState);
    saveGameState(newState);
    setTodoInput("");
  };

  const toggleTodo = (id: number) => {
    const newTodos = gameState.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    const newState = {
      ...gameState,
      todos: newTodos
    };

    setGameState(newState);
    saveGameState(newState);
  };

  const deleteTodo = (id: number) => {
    const newTodos = gameState.todos.filter(todo => todo.id !== id);

    const newState = {
      ...gameState,
      todos: newTodos
    };

    setGameState(newState);
    saveGameState(newState);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const completedCount = gameState.todos.filter(t => t.completed).length;
  const totalCount = gameState.todos.length;
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  const getStatusMessage = () => {
    if (totalCount === 0) {
      return { text: "Add your first task to get started! 📝", className: "text-gray-600" };
    } else if (allCompleted) {
      return { text: "Perfect! You've got the key! 🗝️✨", className: "text-green-600" };
    } else {
      return { 
        text: `Complete ${totalCount - completedCount} more task${totalCount - completedCount !== 1 ? 's' : ''} to get the key! 🗝️`, 
        className: "text-gray-600" 
      };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="min-h-screen ocean-bg pb-20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur p-4 shadow-lg">
        <h1 className="font-display text-2xl font-bold text-ocean-700 text-center">
          {gameState.username}'s ToDo List
        </h1>
        <div className="flex justify-center mt-2">
          <div className="bg-ocean-100 px-4 py-2 rounded-full">
            <span className="text-ocean-700 font-semibold">
              {completedCount}/{totalCount} tasks completed
            </span>
          </div>
        </div>
      </div>
      
      {/* Add ToDo Section */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
          <h3 className="font-display text-lg font-semibold text-gray-700 mb-3">
            <Plus className="inline w-5 h-5 text-ocean-500 mr-2" />
            Add New Task
          </h3>
          
          <div className="flex gap-3">
            <Input
              type="text"
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-ocean-500 focus:outline-none transition-colors"
              maxLength={100}
            />
            <Button
              onClick={addTodo}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* ToDo List */}
        <div className="space-y-3">
          {gameState.todos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item bg-white rounded-xl p-4 shadow-md flex items-center gap-3 transition-all duration-300 ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 text-ocean-500"
              />
              <span className={`flex-1 text-gray-700 ${todo.completed ? 'line-through opacity-60' : ''}`}>
                {todo.text}
              </span>
              <Button
                onClick={() => deleteTodo(todo.id)}
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        
        {/* Status Message */}
        <div className="mt-6 p-4 bg-white/90 backdrop-blur rounded-2xl text-center">
          <div className={`text-lg font-semibold ${statusMessage.className}`}>
            {statusMessage.text}
          </div>
        </div>
      </div>

      <Navigation currentScreen="todo" />
    </div>
  );
}
