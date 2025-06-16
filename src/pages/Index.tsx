
import { CanvasContainer } from "@/components/CanvasContainer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Collaborative Drawing Studio
          </h1>
          <p className="text-xl text-gray-600">
            Switch between individual and group drawing modes
          </p>
        </div>
        <CanvasContainer />
      </div>
    </div>
  );
};

export default Index;
