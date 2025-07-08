import React from "react";

const ProgressSteps = ({ currentStep, setCurrentStep, steps }) => {
  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-6 overflow-x-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-0 flex-1"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors cursor-pointer ${
                currentStep > index + 1
                  ? "bg-green-500 text-white"
                  : currentStep === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setCurrentStep(index + 1)}
            >
              {currentStep > index + 1 ? "✓" : index + 1}
            </div>
            <span className="text-xs mt-1 text-center px-1 break-words">
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Step Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentStep(Math.min(steps.length, currentStep + 1))
          }
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressSteps;
