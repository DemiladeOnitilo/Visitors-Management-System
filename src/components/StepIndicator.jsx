import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const StepIndicator = ({ activeStep, isOpen }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {[1, 2].map((step) => {
        const isDone = activeStep > step || isOpen;
        const isActive = activeStep === step && !isDone;

        return (
          <div key={step} className="flex items-center gap-1">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 font-bold transition-colors duration-300
                ${
                  isDone
                    ? "border-green-400"
                    : isActive
                    ? "border-[#F97316] shadow-sm"
                    : "border-gray-300 text-gray-300"
                }`}
            >
              {isDone ? (
                <FaCheckCircle className="text-green-400 w-6 h-6" />
              ) : (
                <span
                  className={`${isActive ? "text-[#F97316]" : "text-gray-400"}`}
                >
                  0{step}
                </span>
              )}
            </div>

            {step !== 2 && (
              <span
                className={`h-[2px] w-8 transition-colors duration-300 ${
                  isDone
                    ? "bg-green-400"
                    : isActive
                    ? "bg-[#F97316]"
                    : "bg-gray-300"
                }`}
              ></span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
