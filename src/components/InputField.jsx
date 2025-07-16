import React from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

const InputField = ({
  name,
  label,
  icon,
  placeholder,
  type,
  handleChange,
  value,
  error,
  dropdown,
  setDropdown,
  content,
  handleSelected,
  isDropDown,
  maxLength,
  inputMode,
  isOptional,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-[#2E2E2E]">
        {label} {!isOptional && <span className="text-red-500">*</span>}
      </label>
      <div className="flex focus-within:ring-2 focus-within:ring-[#F97316] transition rounded-xl">
        <div
          className={`border ${
            error ? "border-red-500" : "border-gray-300"
          } border-r-0 rounded-l-xl w-14 flex items-center justify-center bg-[#FFF4ED]`}
        >
          {icon}
        </div>
        {!isDropDown ? (
          <input
            name={name}
            type={type}
            maxLength={maxLength}
            inputMode={inputMode}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
            className={`border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-r-xl p-4 h-13 w-full focus:outline-none`}
          />
        ) : (
          <div
            onClick={() => setDropdown(!dropdown)}
            className="relative w-full cursor-pointer"
          >
            <input
              name={name}
              type={type}
              readOnly
              value={value}
              placeholder={placeholder}
              className={`border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-r-xl p-4 h-13 w-full focus:outline-none`}
            />
            <HiOutlineChevronDown
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-transform ${
                dropdown ? "rotate-180" : ""
              }`}
              size={20}
            />
            {dropdown && (
              <div className="absolute top-full w-full bg-white border border-gray-300 rounded-xl shadow-md z-50 max-h-56 overflow-y-auto">
                {content.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelected(item)}
                    className="p-3 pl-6 hover:bg-[#FFF4ED] hover:text-[#F97316] cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
