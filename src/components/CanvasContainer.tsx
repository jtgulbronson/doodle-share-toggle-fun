
import { useState } from "react";
import { DrawingCanvas } from "./DrawingCanvas";
import { ToggleButton } from "./ToggleButton";
import { Users, User } from "lucide-react";

export const CanvasContainer = () => {
  const [isGroupMode, setIsGroupMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <ToggleButton
          isGroupMode={isGroupMode}
          onToggle={setIsGroupMode}
        />
      </div>
      
      <div className="relative">
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            {isGroupMode ? (
              <>
                <Users className="text-purple-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Group Canvas
                </h2>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Collaborative
                </span>
              </>
            ) : (
              <>
                <User className="text-blue-600" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Individual Canvas
                </h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  Personal
                </span>
              </>
            )}
          </div>
          
          <DrawingCanvas 
            key={isGroupMode ? "group" : "individual"} 
            canvasId={isGroupMode ? "group-canvas" : "individual-canvas"}
            isGroupMode={isGroupMode}
          />
        </div>
      </div>
    </div>
  );
};
