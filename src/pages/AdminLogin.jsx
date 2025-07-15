import React, { useState } from "react";
import { FiMail, FiLock, FiArrowLeft } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const foundAdmin = admins.find(
      (admin) =>
        admin.email === formData.email && admin.password === formData.password
    );

    if (foundAdmin) {
      localStorage.setItem("admin", JSON.stringify(foundAdmin));
      navigate("/admin/form");
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E2E2E]">
            Admin Login
          </h1>
          <div className="h-[2px] w-16 bg-[#F97316] rounded-full"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-1 font-semibold"
        >
          <InputField
            name="email"
            label="Email"
            icon={<FiMail size={20} />}
            placeholder="yourname@2am.ng"
            type="email"
            handleChange={handleChange}
            value={formData.email}
          />

          <InputField
            name="password"
            label="Password"
            placeholder="••••••••"
            icon={<FiLock size={20} />}
            type="password"
            handleChange={handleChange}
            value={formData.password}
          />

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <button className="w-full p-4 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300">
            Login
          </button>

          <p className="text-center text-sm mt-2">
            New Staff?{" "}
            <span
              onClick={() => navigate("/admin/signup")}
              className="text-[#F97316] cursor-pointer font-semibold hover:underline"
            >
              Sign Up here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
