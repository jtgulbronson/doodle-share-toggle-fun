
interface StrokeSizePickerProps {
  size: number;
  onChange: (size: number) => void;
}

export const StrokeSizePicker = ({ size, onChange }: StrokeSizePickerProps) => {
  const sizes = [1, 3, 5, 8, 12, 16, 20];

  return (
    <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border">
      <span className="text-sm font-medium text-gray-700">Size:</span>
      
      <div className="flex gap-2">
        {sizes.map((strokeSize) => (
          <button
            key={strokeSize}
            onClick={() => onChange(strokeSize)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center ${
              size === strokeSize ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
            }`}
          >
            <div
              className="rounded-full bg-gray-700"
              style={{
                width: `${Math.min(strokeSize + 2, 16)}px`,
                height: `${Math.min(strokeSize + 2, 16)}px`
              }}
            />
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="1"
          max="30"
          value={size}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20"
        />
        <span className="text-sm text-gray-600 min-w-[2rem]">{size}px</span>
      </div>
    </div>
  );
};
