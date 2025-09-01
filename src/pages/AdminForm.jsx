import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";
import { FaQuestion, FaShieldAlt } from "react-icons/fa";
import InputField from "../components/InputField";
import SuccessModal from "../components/SuccessModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminForm = () => {
  const [formData, setFormData] = useState({
    personName: "",
    phoneNumber: "",
    email: "",
    purpose: "",
    date: "",
    timeIn: "",
    timeOut: "",
    code: "",
  });

  const [errors, setErrors] = useState({
    personName: "",
    phoneNumber: "",
    email: "",
    purpose: "",
    date: "",
    timeIn: "",
    timeOut: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      personName: "",
      phoneNumber: "",
      email: "",
      purpose: "",
      date: "",
      timeIn: "",
      timeOut: "",
      code: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let trimmedValue = value;
    const fieldsToTrim = [
      "hostName",
      "department",
      "personName",
      "email",
      "purpose",
    ];
    if (fieldsToTrim.includes(name)) {
      trimmedValue = value.trimStart();
    }

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 11) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
        if (/^\d{11}$/.test(numericValue)) {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(trimmedValue)) {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } else if (name === "personName") {
      if (trimmedValue.split(/\s+/).length >= 2) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (trimmedValue.length > 0) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,15}$/;

    if (
      !formData.personName ||
      formData.personName.trim().split(/\s+/).length < 2
    ) {
      newErrors.personName = "Please input the visitor's full name";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Please input a phone number";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10–15 digits";
    }

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.purpose) {
      newErrors.purpose = "Please select the purpose for this visit";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.timeIn) {
      newErrors.timeIn = "Please select a time of arrival";
    }

    if (!formData.timeOut) {
      newErrors.timeOut = "Please select a time of departure";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the highlighted errors.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const visitorData = {
      ...formData,
      code,
      hostName: admin?.name || "Admin",
      department: admin?.department || "Admin Department",
    };

    const previousVisits = JSON.parse(localStorage.getItem("visits")) || [];
    previousVisits.push(visitorData);
    localStorage.setItem("visits", JSON.stringify(previousVisits));

    setFormData(visitorData);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-4 md:py-10 relative">
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-2xl shadow-lg hover:shadow-xl hover:text-orange-600 hover:scale-[1.02] md:px-6 md:py-4 p-4 font-semibold transition-all duration-300 cursor-pointer border border-white/50"
      >
        <FiArrowLeft size={20} />
        <span className="hidden md:block">Back to Login</span>
      </button>

      <main className="w-full max-w-2xl flex flex-col items-center gap-10 relative">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mt-16 md:mt-0">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl shadow-lg">
            <FaShieldAlt size={25} />
          </div>
          <span className="font-semibold text-xl">Visitor Management</span>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              {admin?.name || "Admin"}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Create a new visit entry with visitor details and schedule
            information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 font-semibold bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
        >
          <p className="text-center text-sm mt-2 text-gray-500">
            Host:{" "}
            <span className="text-[#F97316] font-semibold">
              {admin?.name || "Admin"}
            </span>{" "}
            • Department:{" "}
            <span className="text-[#F97316] font-semibold">
              {admin?.department || "Admin Department"}
            </span>
          </p>

          <InputField
            name="personName"
            label="Visitor Full Name"
            icon={<FiUser size={15} />}
            placeholder="Tom Dinkle"
            type="text"
            handleChange={handleChange}
            value={formData.personName}
            error={errors.personName}
          />

          <InputField
            name="phoneNumber"
            label="Phone Number"
            icon={<FiPhone size={15} />}
            maxLength={11}
            inputMode="numeric"
            type="tel"
            placeholder="12345678910"
            handleChange={handleChange}
            value={formData.phoneNumber}
            error={errors.phoneNumber}
          />

          <InputField
            name="email"
            label="Email Address"
            icon={<FiMail size={15} />}
            placeholder="tomdinkle@gmail.com"
            type="email"
            handleChange={handleChange}
            value={formData.email}
            error={errors.email}
            isOptional={true}
          />

          <InputField
            name="purpose"
            label="Purpose of Visit"
            type="text"
            icon={<FaQuestion size={15} />}
            placeholder="Why are you visiting"
            handleChange={handleChange}
            value={formData.purpose}
            error={errors.purpose}
          />

          <InputField
            name="date"
            label="Visit Date"
            icon={<FiCalendar size={18} />}
            type="date"
            handleChange={handleChange}
            value={formData.date}
            error={errors.date}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              name="timeIn"
              label="Time In"
              icon={<FiClock size={18} />}
              type="time"
              handleChange={handleChange}
              value={formData.timeIn}
              error={errors.timeIn}
            />

            <InputField
              name="timeOut"
              label="Time Out"
              icon={<FiClock size={18} />}
              type="time"
              handleChange={handleChange}
              value={formData.timeOut}
              error={errors.timeOut}
            />
          </div>
          <button className="w-full mt-8 p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg overflow-hidden group cursor-pointer relative shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Create Visit
              <FiArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
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
                  Visit Security
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  All visitor entries are logged and monitored for security
                  purposes. A unique access code will be generated for each
                  visit.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      {isOpen && (
        <SuccessModal
          formData={formData}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminForm;
