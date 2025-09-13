import React from "react";

const MainHeader = ({ text, coloredText, subtext }) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center max-w-2xl px-4">
      <h1 className="text-3xl md:text-4xl font-bold leading-tight">
        {text}{" "}
        <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          {coloredText}
        </span>
      </h1>
      <p className="text-md md:text-lg text-slate-600 leading-relaxed font-medium">
        {subtext}
      </p>
    </div>
  );
};

export default MainHeader;