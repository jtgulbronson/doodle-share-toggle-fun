
import { useState } from "react";
import { CanvasContainer } from "@/components/CanvasContainer";
import { ExerciseSelector } from "@/components/ExerciseSelector";

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  participants: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const Index = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleBackToExercises = () => {
    setSelectedExercise(null);
  };

  if (!selectedExercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <ExerciseSelector onSelectExercise={handleExerciseSelect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <button
            onClick={handleBackToExercises}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            ← Back to Exercises
          </button>
          
          <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 inline-block mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedExercise.name}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {selectedExercise.duration} • {selectedExercise.participants}
            </p>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {selectedExercise.description}
          </p>
        </div>
        
        <CanvasContainer />
      </div>
    </div>
  );
};

export default Index;
