import React, { useState, useEffect } from "react";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const ReceptionLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("receptionist")) {
      localStorage.removeItem("receptionist");
      window.location.href = "/admin/reception/login";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const storedReceptionists =
    JSON.parse(localStorage.getItem("receptionists")) || [];

  const foundReceptionist = storedReceptionists.find(
    (receptionist) =>
      receptionist.email === formData.email &&
      receptionist.password === formData.password
  );

  if (foundReceptionist) {
    localStorage.setItem("receptionist", JSON.stringify(foundReceptionist));
    navigate("/admin/reception/dashboard");
  } else {
    setError("Invalid Email or Password");
  }
};


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF4ED] px-4 relative">
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#2E2E2E] hover:text-[#F97316] font-semibold transition-colors duration-300 cursor-pointer"
      >
        <FiArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-xl">
        <div className="flex flex-col gap-3 items-center text-center">
          <FaShieldAlt size={40} className="text-[#F97316]" />
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E2E2E] ">
            Reception Login
          </h1>
          <div className="h-[2px] w-16 bg-[#F97316] rounded-full"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 font-semibold inter"
        >
          <InputField
            name="email"
            label="Email"
            icon={<FiMail size={20} />}
            placeholder="johndoe@gmail.com"
            type="email"
            handleChange={handleChange}
            value={formData.email}
          />
          <InputField
            name="password"
            label="Password"
            placeholder="Password"
            icon={<FiLock size={20} />}
            type="password"
            handleChange={handleChange}
            value={formData.password}
          />

          {error && (
            <p className="text-red-500 text-sm font-normal inter">{error}</p>
          )}

          <button className="w-full p-4 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300 ">
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            New staff?{" "}
            <span
              onClick={() => navigate("/admin/reception/signup")}
              className="text-[#F97316] font-semibold cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ReceptionLogin;
