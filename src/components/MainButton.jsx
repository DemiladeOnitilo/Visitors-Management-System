import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

const MainButton = ({ name, variant, arrowRight, arrowLeft, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center text-center font-bold w-full py-4 px-4 md:px-6 rounded-xl text-sm md:text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center  ${
        variant === "primary"
          ? "bg-gradient-to-r from-[#F97316] to-red-500 hover:from-[#3A3D46] hover:to-slate-700 text-white"
          : "bg-slate-100 backdrop-blur-sm hover:bg-white text-slate-700 border border-white/50 hover:border-orange-200"
      } `}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {arrowLeft && (
          <FiArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
        )}
        {name}
        {arrowRight && (
          <FiArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        )}
      </span>
    </button>
  );
};

export default MainButton;
