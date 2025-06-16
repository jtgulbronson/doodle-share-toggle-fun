
interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const predefinedColors = [
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#EF4444", // Red
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EC4899", // Pink
    "#6B7280", // Gray
    "#000000", // Black
  ];

  return (
    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border">
      <span className="text-sm font-medium text-gray-700">Color:</span>
      
      <div className="flex gap-2">
        {predefinedColors.map((presetColor) => (
          <button
            key={presetColor}
            onClick={() => onChange(presetColor)}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              color === presetColor ? "border-gray-800 ring-2 ring-offset-1 ring-gray-300" : "border-gray-300"
            }`}
            style={{ backgroundColor: presetColor }}
          />
        ))}
      </div>
      
      <div className="relative">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
        />
        <div className="absolute inset-0 rounded border-2 border-gray-300 pointer-events-none" />
      </div>
    </div>
  );
};
