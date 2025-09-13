import React from "react";

const TopBadge = ({ text, subText, icon }) => {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200/60">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-1.5 rounded-xl">
        {icon}
      </div>
      <div className="text-center">
        <div className="font-bold text-sm md:text-md font-black text-slate-800">
          {text}
        </div>
        <div className="text-xs lg:text-sm text-slate-600">
          {subText}
        </div>
      </div>
    </div>
  );
};

export default TopBadge;
