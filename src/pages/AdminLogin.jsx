import React, { useState, useEffect } from "react";
import { FiMail, FiLock, FiEyeOff, FiEye, FiShield } from "react-icons/fi";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import TopBadge from "../components/TopBadge";
import BackButton from "../components/BackButton";
import MainButton from "../components/MainButton";
import MainHeader from "../components/MainHeader";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const MASTER_ADMIN_ACCOUNTS = [
    {
      email: "demilade@2am.ng",
      name: "Demilade Onitilo",
      department: "Software Engineering",
      password: "Password2AM!", 
    },
    {
      email: "admin@2am.ng",
      name: "System Admin",
      department: "Operations",
      password: "SecureAdmin2AM",
    },
  ];

  // 1. Unified initialization effect hook
  useEffect(() => {
    // Seed admin accounts database if empty
    const existingAdmins = localStorage.getItem("admins");
    if (!existingAdmins) {
      localStorage.setItem("admins", JSON.stringify(MASTER_ADMIN_ACCOUNTS));
    }

    // OPERATIONAL: Look for saved email if remember me was previously checked
    const savedEmail = localStorage.getItem("remembered_admin_email");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let trimmedValue = name === "email" ? value.trimStart() : value;

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(trimmedValue)) {
        setError((prev) => ({ ...prev, email: "" }));
      }
    } else if (trimmedValue.length > 0) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Please input your email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Please input your password";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const currentAdmins = JSON.parse(localStorage.getItem("admins")) || MASTER_ADMIN_ACCOUNTS;
    
    const foundAdmin = currentAdmins.find(
      (admin) =>
        admin.email.toLowerCase() === formData.email.trim().toLowerCase() && admin.password === formData.password,
    );

    if (foundAdmin) {
      // OPERATIONAL: Manage persistent cache states based on check options
      if (rememberMe) {
        localStorage.setItem("remembered_admin_email", formData.email.trim());
      } else {
        localStorage.removeItem("remembered_admin_email");
      }

      localStorage.setItem("admin", JSON.stringify(foundAdmin));
      navigate("/admin/selection");
    } else {
      const emailExists = currentAdmins.find(
        (admin) => admin.email.toLowerCase() === formData.email.trim().toLowerCase(),
      );
      if (emailExists) {
        setError({ email: "", password: "Incorrect password" });
      } else {
        setError({ email: "Email not found", password: "" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6 md:py-10 relative">
      <BackButton text="Back" onClick={() => navigate("/admin")} />

      <main className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-10 pt-16 md:pt-0 relative z-10">
        <TopBadge text="Admin Login" icon={<FiLock size={14} />} />

        <MainHeader
          text="Welcome"
          coloredText="Back"
          subtext="Login to your admin account to book visits or reserve a meeting room. Ensure your credentials are correct for a secure login."
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-md font-semibold bg-white/90 backdrop-blur-sm rounded-3xl p-6 pt-12 md:p-10 shadow-xl border border-white/20"
        >
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
              className="absolute right-3 top-14 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-600 select-none">Remember me</span>
            </div>
            <button
              type="button"
              className="text-[#F97316] text-sm font-semibold hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <MainButton
            onClick={handleSubmit}
            name="Login"
            variant="primary"
            arrowRight={true}
          />

          <div className="mt-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-200">
            <div className="flex items-start gap-3">
              <FiShield
                size={18}
                className="text-orange-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-1">
                  Secure Login
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your session is protected with enterprise-grade encryption.
                  All login attempts are monitored.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminLogin;