
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { ColorPicker } from "./ColorPicker";
import { StrokeSizePicker } from "./StrokeSizePicker";
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
  const [activeTool, setActiveTool] = useState<"pen" | "eraser" | "text" | "rectangle" | "circle">("pen");
  const [strokeSize, setStrokeSize] = useState(3);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isTextMode, setIsTextMode] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 500;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = strokeSize;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setContext(ctx);
    
    toast.success(`${isGroupMode ? "Group" : "Individual"} canvas ready!`);
  }, [isGroupMode]);

  useEffect(() => {
    if (context) {
      context.lineWidth = strokeSize;
    }
  }, [strokeSize, context]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setStartPos({ x, y });

    if (activeTool === "text") {
      setIsTextMode(true);
      return;
    }
    
    setIsDrawing(true);
    
    if (activeTool === "pen" || activeTool === "eraser") {
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
    
    if (activeTool === "pen") {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = activeColor;
      context.lineTo(x, y);
      context.stroke();
    } else if (activeTool === "eraser") {
      context.globalCompositeOperation = "destination-out";
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
    
    context.globalCompositeOperation = "source-over";
    
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

  const handleTextSubmit = () => {
    if (!context || !textInput.trim()) return;
    
    context.font = `${strokeSize * 6}px Arial`;
    context.fillStyle = activeColor;
    context.fillText(textInput, startPos.x, startPos.y);
    
    setTextInput("");
    setIsTextMode(false);
  };

  const handleTextCancel = () => {
    setTextInput("");
    setIsTextMode(false);
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
        <StrokeSizePicker
          size={strokeSize}
          onChange={setStrokeSize}
        />
      </div>
      
      <div className="flex justify-center relative">
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
        
        {isTextMode && (
          <div className="absolute bg-white border border-gray-300 rounded-lg p-4 shadow-lg"
               style={{ left: startPos.x + 20, top: startPos.y + 20 }}>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text..."
              className="border border-gray-300 rounded px-2 py-1 mb-2 w-full"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleTextSubmit}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={handleTextCancel}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
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
