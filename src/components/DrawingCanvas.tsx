
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { toast } from "sonner";

interface DrawingCanvasProps {
  canvasId: string;
  isGroupMode: boolean;
}

export const DrawingCanvas = ({ canvasId, isGroupMode }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState("#3B82F6");
  const [activeTool, setActiveTool] = useState<"draw" | "rectangle" | "circle">("draw");
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 500;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setContext(ctx);
    
    toast.success(`${isGroupMode ? "Group" : "Individual"} canvas ready!`);
  }, [isGroupMode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPos({ x, y });
    setIsDrawing(true);
    
    if (activeTool === "draw") {
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (activeTool === "draw") {
      context.strokeStyle = activeColor;
      context.lineTo(x, y);
      context.stroke();
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (activeTool === "rectangle") {
      context.fillStyle = activeColor;
      const width = x - startPos.x;
      const height = y - startPos.y;
      context.fillRect(startPos.x, startPos.y, width, height);
    } else if (activeTool === "circle") {
      context.fillStyle = activeColor;
      const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
      context.beginPath();
      context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      context.fill();
    }
    
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return;
    
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    toast.success("Canvas cleared!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Toolbar 
          activeTool={activeTool} 
          onToolChange={setActiveTool}
          onClear={clearCanvas}
        />
        <ColorPicker 
          color={activeColor} 
          onChange={setActiveColor} 
        />
      </div>
      
      <div className="flex justify-center">
        <div className="border-2 border-gray-200 rounded-lg shadow-inner bg-white">
          <canvas
            ref={canvasRef}
            className="rounded-lg cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
      
      {isGroupMode && (
        <div className="text-center">
          <p className="text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full inline-block">
            🎨 You're drawing in collaborative mode - others can see your work!
          </p>
        </div>
      )}
    </div>
  );
};
