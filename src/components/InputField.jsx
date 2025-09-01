import React from "react";

const InputField = ({ 
  name, 
  label, 
  icon, 
  placeholder, 
  type, 
  handleChange, 
  value, 
  error, 
  maxLength, 
  inputMode,
  isOptional = false 
}) => {
  const isValid = value && !error;
  const hasError = error && error.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <span className="text-orange-500 flex-shrink-0">{icon}</span>
        <span>{label}</span>
        {isOptional && (
          <span className="text-xs text-slate-400 font-normal bg-slate-100 px-2 py-0.5 rounded-full">
            Optional
          </span>
        )}
      </label>
      
      <div className="relative group">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          maxLength={maxLength}
          inputMode={inputMode}
          className={`w-full h-15 px-4 py-3 bg-slate-50/50 border-2 rounded-xl font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all duration-300 pr-12 ${
            hasError 
              ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:bg-red-50" 
              : isValid
              ? "border-green-400 bg-green-50/30 focus:border-green-500 focus:bg-green-50"
              : "border-slate-200 hover:border-slate-300 focus:border-orange-400 focus:bg-white group-hover:border-orange-300"
          }`}
        />
        
   
      </div>
      
      {hasError && (
        <div className="flex items-start gap-2 mt-1">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
          <span className="text-red-600 text-sm font-medium leading-relaxed">
            {error}
          </span>
        </div>
      )}
      
      {name === "phoneNumber" && (
        <div className="text-xs text-slate-400 text-right">
          {value.length}/11 digits
        </div>
      )}
    </div>
  );
};

export default InputField;