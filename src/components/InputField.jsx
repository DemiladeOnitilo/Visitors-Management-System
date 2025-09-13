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
  isOptional = false,
}) => {
  const isValid = value && !error;
  const hasError = error && error.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 flex-shrink-0">{icon}</span>
          <span className="text-sm">{label}</span>
        </div>
        {isOptional ? (
          <span className="text-xs text-slate-400 font-normal bg-slate-100 px-2 py-0.5 rounded-full">
            Optional
          </span>
        ) : (
          <span className="text-red-500 text-lg">*</span>
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
          className={`w-full min-w-0 h-14 px-4 py-3 bg-slate-50/50 border-2 rounded-xl font-medium text-base md:text-sm
             text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all duration-300 ${
               hasError
                 ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:bg-red-50"
                 : isValid
                   ? "border-green-400 bg-green-50/30 focus:border-green-500 focus:bg-green-50"
                   : "border-slate-200 hover:border-slate-300 focus:border-orange-400 focus:bg-white group-hover:border-orange-300"
             }`}
        />

        {(type === "date" || type === "time") && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none z-20">
            {icon}
          </div>
        )}
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
