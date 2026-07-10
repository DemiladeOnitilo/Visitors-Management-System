import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import { ToastContainer, toast } from "react-toastify";
import FormStepOne from "../components/FormStepOne";
import FormStepTwo from "../components/FormStepTwo";
import StepIndicator from "../components/StepIndicator";
import { FiCalendar } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import TopBadge from "../components/TopBadge";
import BackButton from "../components/BackButton";
import MainHeader from "../components/MainHeader";

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

    const visitorData = {
      ...formData,
      code,
      createdBy: "Visitor",
      status: "Pending",
    };

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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6 md:py-10 relative">
      <BackButton text="Back Home" onClick={() => navigate("/")} />

      <main className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-10 pt-16 md:pt-0 relative z-10">
        <TopBadge text="Visitor Management" icon={<FaUserTie size={14} />} />

        <MainHeader
          text="Register your"
          coloredText="Visit Profile"
          subText="Register your visit in just two simple steps with our streamlined, secure process designed for your convenience."
        />

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

      <ToastContainer />
    </div>
  );
};

export default VisitorPage;
