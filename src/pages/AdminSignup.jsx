import React, { useState } from "react";
import {
  FiMail,
  FiLock,
  FiArrowLeft,
  FiEyeOff,
  FiEye,
  FiShield,
  FiUser,
  FiBriefcase,
  FiArrowRight,
} from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let trimmedValue = value;
    const fieldsToTrim = ["email", "name"];
    if (fieldsToTrim.includes(name)) {
      trimmedValue = value.trimStart();
    }

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));

    if (name === "email") {
      const emailRegex = /^[a-z0-9]+@2am\.ng$/i;
      if (emailRegex.test(trimmedValue)) {
        setError((prev) => ({ ...prev, email: "" }));
      }
    } else if (name === "password") {
      if (trimmedValue.length >= 6) {
        setError((prev) => ({ ...prev, password: "" }));
      }
    } else if (trimmedValue.length > 0) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    const emailRegex = /^[a-z0-9]+@2am\.ng$/i;

    if (!formData.name) {
      newErrors.name = "Please input your full name";
    }

    if (!formData.email) {
      newErrors.email = "Please input your email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email must be in the format 'something@2am.ng'";
    }

    if (!formData.password) {
      newErrors.password = "Please input your password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.department) {
      newErrors.department = "Please select your department";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    const emailExists = admins.find(
      (admin) => admin.email === formData.email
    );

    if (emailExists) {
      setError({
        name: "",
        email: "Email already exists",
        password: "",
        department: "",
      });
      return;
    }

    admins.push({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      department: formData.department.trim(),
    });

    localStorage.setItem("admins", JSON.stringify(admins));

    toast.success("Signup successful! Redirecting to login...", {
      position: "top-right",
      autoClose: 3000,
      onClose: () => navigate("/admin/login"),
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-4 md:py-10 relative">
      <button
        onClick={() => navigate("/admin/login")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-2xl shadow-lg hover:shadow-xl hover:text-orange-600 hover:scale-[1.02] md:px-6 md:py-4 p-4 font-semibold transition-all duration-300 cursor-pointer border border-white/50"
      >
        <FiArrowLeft size={20} />
        <span className="hidden md:block">Back to Login</span>
      </button>

      <main className="w-full max-w-xl flex flex-col items-center gap-10 relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mt-16 md:mt-0">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl shadow-lg">
            <FaShieldAlt size={25} />
          </div>
          <span className="font-semibold text-xl">Admin Signup</span>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-5xl md:text-6xl font-bold">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create your admin account to access the visitor management system with
            appropriate permissions and tools
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5  font-semibold bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
        >
          <InputField
            name="name"
            label="Full Name"
            icon={<FiUser size={15} />}
            placeholder="John Doe"
            type="text"
            handleChange={handleChange}
            value={formData.name}
            error={error.name}
          />

          <InputField
            name="email"
            label="Email Address"
            icon={<FiMail size={15} />}
            placeholder="yourname@2am.ng"
            type="email"
            handleChange={handleChange}
            value={formData.email}
            error={error.email}
          />

          <InputField
            name="department"
            label="Department"
            icon={<FiBriefcase size={15} />}
            placeholder="Select Department"
            type="text"
            handleChange={handleChange}
            value={formData.department}
            error={error.department}
          />

          <div className="relative">
            <InputField
              name="password"
              label="Password"
              placeholder="Enter your password"
              icon={<FiLock size={15} />}
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              value={formData.password}
              error={error.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-12 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
                   className="w-full mt-8 p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg overflow-hidden group cursor-pointer relative shadow-lg hover:shadow-xl transition-all duration-300"
                 >
                   <span className="relative z-10 flex items-center justify-center gap-3">
                    Sign Up
                    <FiArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                   </span>
                   <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                   
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                 </button>

          <div className="mt-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-200">
            <div className="flex items-start gap-3">
              <FiShield
                size={18}
                className="text-orange-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-1">
                  Account Security
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your account will be secured with enterprise-grade encryption.
                  All registration attempts are monitored and logged for security
                  purposes.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/admin/login")}
              className="text-[#F97316] hover:text-orange-600 cursor-pointer font-semibold hover:underline transition-all duration-400"
            >
              Login here
            </span>
          </p>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
};

export default AdminSignup;