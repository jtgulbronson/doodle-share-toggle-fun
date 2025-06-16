
import { Users, User } from "lucide-react";

interface ToggleButtonProps {
  isGroupMode: boolean;
  onToggle: (isGroupMode: boolean) => void;
}

export const ToggleButton = ({ isGroupMode, onToggle }: ToggleButtonProps) => {
  return (
    <div className="relative bg-white rounded-full p-2 shadow-lg border border-gray-200">
      <div className="flex items-center">
        <button
          onClick={() => onToggle(false)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            !isGroupMode
              ? "bg-blue-500 text-white shadow-md transform scale-105"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <User size={20} />
          <span className="font-medium">Individual</span>
        </button>
        
        <button
          onClick={() => onToggle(true)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
            isGroupMode
              ? "bg-purple-500 text-white shadow-md transform scale-105"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Users size={20} />
          <span className="font-medium">Group</span>
        </button>
      </div>
    </div>
  );
};
