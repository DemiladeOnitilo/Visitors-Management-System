import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const AdminSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF4ED] px-4">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#2E2E2E] hover:text-[#F97316] font-semibold  transition-colors duration-300 cursor-pointer"
      >
        <FiArrowLeft size={20} />
        Back Home
      </button>

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md flex flex-col gap-8 items-center text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold  text-[#2E2E2E]">
            Staff Login
          </h1>
          <p className="text-gray-600 text-lg inter">
            Please select an option:
          </p>
          <div className="h-[2px] w-16 mx-auto bg-[#F97316] rounded-full"></div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => navigate("/admin/login")}
            className="w-full p-4 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300 "
          >
            Staff Side
          </button>
          <button
            onClick={() => navigate("/admin/reception/login")}
            className="w-full p-4 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300 "
          >
            Reception Side
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSelectionPage;
