import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import { ToastContainer, toast } from "react-toastify";
import FormStepOne from "../components/FormStepOne";
import FormStepTwo from "../components/FormStepTwo";
import StepIndicator from "../components/StepIndicator";
import { FiArrowLeft, FiUsers, FiShield } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

const VisitorPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hostName: "",
    department: "",
    date: "",
    timeOut: "",
    timeIn: "",
    personName: "",
    phoneNumber: "",
    email: "",
    purpose: "",
    code: "",
  });
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setActiveStep(1);
    setFormData({
      hostName: "",
      department: "",
      date: "",
      timeOut: "",
      timeIn: "",
      personName: "",
      phoneNumber: "",
      email: "",
      purpose: "",
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
    } else if (name === "personName" || name === "hostName") {
      if (trimmedValue.split(/\s+/).length >= 2) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (trimmedValue.length > 0) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (
      !formData.hostName ||
      formData.hostName.trim().split(/\s+/).length < 2
    ) {
      newErrors.hostName = "Please input the host's full name";
    }
    if (!formData.department) {
      newErrors.department = "Please select a department";
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
      toast.error("Please fill all required fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setActiveStep(2);
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.personName ||
      formData.personName.trim().split(/\s+/).length < 2
    ) {
      newErrors.personName = "Please input your full name";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Please input your phone number";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 11 digits";
    }
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.purpose) {
      newErrors.purpose = "Please select a purpose";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const visitorData = { ...formData, code };
    const previousVisits = JSON.parse(localStorage.getItem("visits")) || [];
    previousVisits.push(visitorData);
    localStorage.setItem("visits", JSON.stringify(previousVisits));

    setFormData(visitorData);
    setIsOpen(true);

    toast.success("Registration completed successfully!", {
      position: "top-right",
      autoClose: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-6 md:py-10 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-2xl shadow-lg hover:shadow-xl hover:text-orange-600 hover:scale-[1.02] md:px-6 md:py-4 p-4 font-semibold transition-all duration-300 cursor-pointer border border-white/50"
      >
        <FiArrowLeft size={20} />
        <span className="hidden md:block">Back Home</span>
      </button>

      <main className="w-full max-w-4xl flex flex-col items-center gap-8 relative px-4">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mt-16 md:mt-0">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl shadow-lg">
            <FaUserTie size={28} />
          </div>
          <div className="text-left">
            <div className="font-bold text-xl text-slate-800">
              Visitor Management
            </div>
            <div className="text-sm text-slate-600">
              Secure Registration System
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Welcome to our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600  bg-clip-text text-transparent">
              Visitor System
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Register your visit in just two simple steps with our streamlined,
            secure process designed for your convenience
          </p>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-2xl border border-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/30 rounded-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <StepIndicator activeStep={activeStep} isOpen={isOpen} />

            {activeStep === 1 && (
              <FormStepOne
                handleUserSubmit={handleUserSubmit}
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />
            )}
            {activeStep === 2 && (
              <FormStepTwo
                handlePersonSubmit={handlePersonSubmit}
                formData={formData}
                errors={errors}
                handleChange={handleChange}
                setActiveStep={setActiveStep}
              />
            )}
          </div>
        </div>

        <div className="text-center text-slate-500 max-w-2xl">
          <p className="text-sm leading-relaxed">
            By registering, you agree to our visitor policies and security
            protocols. Your information is protected and will only be used for
            visit management purposes.
          </p>
        </div>
      </main>

      {isOpen && (
        <SuccessModal
          formData={formData}
          isOpen={isOpen}
          closeModal={closeModal}
          isVisitor
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="backdrop-blur-sm"
      />
    </div>
  );
};

export default VisitorPage;
