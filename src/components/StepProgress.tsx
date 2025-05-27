import React, { ReactNode } from 'react';

interface Step {
  title: string;
  description: string;
  content?: ReactNode;
}

interface StepProgressProps {
  steps: Step[];
  currentStep?: number;
}

const StepProgress = ({ steps, currentStep = 0 }: StepProgressProps) => {
  return (
    <div className="w-full">
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Step Number Circle */}
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
              ${index <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-600'
              } font-semibold text-lg
            `}>
              {index + 1}
            </div>
            
            {/* Step Content */}
            <div className="flex-grow pt-1">
              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{step.description}</p>
              {step.content && (
                <div className="mt-4">
                  {step.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Vertical Line Connecting Steps */}
      <div className="absolute left-4 top-12 bottom-4 w-0.5 bg-blue-100 -z-10"></div>
    </div>
  );
};

export default StepProgress; 