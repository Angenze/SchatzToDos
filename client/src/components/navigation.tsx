import { useLocation } from "wouter";
import { List, Shovel, Book } from "lucide-react";

interface NavigationProps {
  currentScreen: 'todo' | 'treasure' | 'collection';
}

export default function Navigation({ currentScreen }: NavigationProps) {
  const [, navigate] = useLocation();

  const navItems = [
    { id: 'todo', icon: List, label: 'Tasks', path: '/todo' },
    { id: 'treasure', icon: Shovel, label: 'Treasure', path: '/treasure' },
    { id: 'collection', icon: Book, label: 'Collection', path: '/collection' }
  ];

  return (
    <div className="navigation-bar fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 z-50">
      <div className="flex justify-around py-3">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 transition-colors ${
                isActive ? 'text-ocean-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
