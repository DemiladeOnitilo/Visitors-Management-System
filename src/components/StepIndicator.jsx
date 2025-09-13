import React from "react";
import { FiCheck } from "react-icons/fi";

const StepIndicator = ({ activeStep, isOpen }) => {
  const steps = [
    { number: 1, title: "Host Info" },
    { number: 2, title: "Your Info" }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isDone = activeStep > step.number || isOpen;
          const isActive = activeStep === step.number && !isDone;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-300 ${
                    isDone
                      ? "border-green-500 bg-green-500 text-white"
                      : isActive
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {isDone ? (
                    <FiCheck size={16} />
                  ) : (
                    <span className="text-sm">{step.number}</span>
                  )}
                </div>
                
                <div className={`mt-2 text-xs md:text-sm font-medium transition-colors duration-300 ${
                  isActive 
                    ? 'text-orange-600' 
                    : isDone 
                    ? 'text-green-600' 
                    : 'text-slate-400'
                }`}>
                  {step.title}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mt-[-24px] transition-colors duration-300 ${
                  activeStep > step.number || isOpen ? 'bg-green-500' : 'bg-slate-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>

   
    </div>
  );
};

export default StepIndicator;