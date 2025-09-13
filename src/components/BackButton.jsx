import React from "react";
import { FiArrowLeft } from "react-icons/fi";

const BackButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-6 left-4 md:left-8 z-50 flex items-center gap-2 bg-white text-slate-700 rounded-xl shadow-sm border border-slate-200/60 hover:text-orange-600 hover:border-orange-200 hover:scale-[1.01] px-4 py-2.5 font-bold text-sm transition-all duration-200 cursor-pointer"
    >
      <FiArrowLeft size={20} />
      <span>{text}</span>
    </button>
  );
};

export default BackButton;