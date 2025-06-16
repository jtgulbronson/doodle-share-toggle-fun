
import { Pen, Square, Circle, Trash2 } from "lucide-react";

interface ToolbarProps {
  activeTool: "draw" | "rectangle" | "circle";
  onToolChange: (tool: "draw" | "rectangle" | "circle") => void;
  onClear: () => void;
}

export const Toolbar = ({ activeTool, onToolChange, onClear }: ToolbarProps) => {
  const tools = [
    { id: "draw" as const, icon: Pen, label: "Draw" },
    { id: "rectangle" as const, icon: Square, label: "Rectangle" },
    { id: "circle" as const, icon: Circle, label: "Circle" },
  ];

  return (
    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTool === tool.id
                ? "bg-blue-500 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:bg-white hover:shadow-sm"
            }`}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{tool.label}</span>
          </button>
        );
      })}
      
      <div className="w-px h-8 bg-gray-300 mx-2" />
      
      <button
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
      >
        <Trash2 size={18} />
        <span className="text-sm font-medium">Clear</span>
      </button>
    </div>
  );
};
