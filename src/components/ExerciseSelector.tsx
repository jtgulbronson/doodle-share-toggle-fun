
import { useState } from "react";
import { Clock, Users, Lightbulb, Zap, Target, Layers } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  description: string;
  duration: string;
  participants: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface ExerciseSelectorProps {
  onSelectExercise: (exercise: Exercise) => void;
}

const exercises: Exercise[] = [
  {
    id: "10x10",
    name: "10x10 Sketching",
    description: "Generate 10 different ideas in 10 minutes. Quick ideation to explore various concepts rapidly.",
    duration: "10 minutes",
    participants: "Individual or Group",
    icon: Target
  },
  {
    id: "crazy-8s",
    name: "Crazy 8s",
    description: "Sketch 8 distinct ideas in 8 minutes. One minute per idea to push creative boundaries.",
    duration: "8 minutes",
    participants: "Individual or Group",
    icon: Zap
  },
  {
    id: "storyboard",
    name: "Storyboarding",
    description: "Create a visual narrative showing user journey or process flow step by step.",
    duration: "15-30 minutes",
    participants: "Individual or Group",
    icon: Layers
  },
  {
    id: "mind-mapping",
    name: "Mind Mapping",
    description: "Visual brainstorming to explore connections between ideas and concepts.",
    duration: "10-20 minutes",
    participants: "Individual or Group",
    icon: Lightbulb
  },
  {
    id: "user-flow",
    name: "User Flow Sketching",
    description: "Map out user interactions and decision points in a product or service.",
    duration: "20-45 minutes",
    participants: "Group preferred",
    icon: Users
  },
  {
    id: "wireframing",
    name: "Rapid Wireframing",
    description: "Quick low-fidelity interface layouts focusing on structure and functionality.",
    duration: "15-30 minutes",
    participants: "Individual or Group",
    icon: Layers
  }
];

export const ExerciseSelector = ({ onSelectExercise }: ExerciseSelectorProps) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const handleStart = () => {
    if (selectedExercise) {
      onSelectExercise(selectedExercise);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Choose Your Design Exercise
        </h1>
        <p className="text-xl text-gray-600">
          Select a sketching exercise to get started with your creative session
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {exercises.map((exercise) => {
          const Icon = exercise.icon;
          const isSelected = selectedExercise?.id === exercise.id;
          
          return (
            <button
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg transform hover:scale-105 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{exercise.name}</h3>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {exercise.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                  <Clock size={14} />
                  {exercise.duration}
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                  <Users size={14} />
                  {exercise.participants}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedExercise && (
        <div className="text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Ready to start: {selectedExercise.name}
            </h3>
            <p className="text-gray-600 mb-4">{selectedExercise.description}</p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <span>Duration: {selectedExercise.duration}</span>
              <span>•</span>
              <span>{selectedExercise.participants}</span>
            </div>
          </div>
          
          <button
            onClick={handleStart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Exercise
          </button>
        </div>
      )}
    </div>
  );
};
