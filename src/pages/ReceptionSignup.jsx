import React, { useState } from "react";
import { FiMail, FiLock, FiArrowLeft, FiUser } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReceptionSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9]+@2am\.ng$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email must be in the format 'something@2am.ng'";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const existingReceptionists =
      JSON.parse(localStorage.getItem("receptionists")) || [];

    existingReceptionists.push({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });

    localStorage.setItem(
      "receptionists",
      JSON.stringify(existingReceptionists)
    );

    toast.success("Signup successful! Redirecting to login...", {
      position: "top-right",
      autoClose: 3000,
      onClose: () => navigate("/admin/reception/login"),
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFF4ED] px-4 relative">
      <button
        onClick={() => navigate("/admin/reception/login")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#2E2E2E] hover:text-[#F97316] font-semibold transition-colors duration-300 cursor-pointer"
      >
        <FiArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-xl flex flex-col gap-6">
        <div className="flex flex-col gap-3 items-center text-center">
          <FaShieldAlt size={40} className="text-[#F97316]" />
          <h1 className="text-3xl md:text-4xl font-bold text-[#2E2E2E] ">
            Reception Signup
          </h1>
          <div className="h-[2px] w-16 bg-[#F97316] rounded-full"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-1 font-semibold"
        >
          <InputField
            name="name"
            label="Full Name"
            icon={<FiUser size={20} />}
            placeholder="Jane Doe"
            type="text"
            handleChange={handleChange}
            value={formData.name}
            error={errors.name}
          />

          <InputField
            name="email"
            label="Email"
            icon={<FiMail size={20} />}
            placeholder="janedoe@2am.ng"
            type="email"
            handleChange={handleChange}
            value={formData.email}
            error={errors.email}
          />

          <InputField
            name="password"
            label="Password"
            placeholder="••••••••"
            icon={<FiLock size={20} />}
            type="password"
            handleChange={handleChange}
            value={formData.password}
            error={errors.password}
          />

          <button className="w-full p-4 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300 ">
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReceptionSignup;
