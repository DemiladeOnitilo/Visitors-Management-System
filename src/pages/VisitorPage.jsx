import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";
import { ToastContainer, toast } from "react-toastify";
import FormStepOne from "../components/FormStepOne";
import FormStepTwo from "../components/FormStepTwo";
import StepIndicator from "../components/StepIndicator";
import { FiArrowLeft } from "react-icons/fi";

const VisitorPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hostName: "",
    department: "",
    date: "",
    time: "",
    personName: "",
    phoneNumber: "",
    email: "",
    purpose: "",
    code: "",
  });
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [department, setDepartment] = useState(false);
  const [purpose, setPurpose] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setActiveStep(1);
    setFormData({
      hostName: "",
      department: "",
      date: "",
      time: "",
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
    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields.", {
        position: "top-right",
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
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#2E2E2E] hover:text-[#F97316] font-semibold transition-colors duration-300 cursor-pointer"
      >
        <FiArrowLeft size={20} />
        Back Home
      </button>

      <div className="bg-white shadow-xl md:rounded-3xl max-w-xl w-full md:px-8 px-2 py-16">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-4xl font-bold text-[#2E2E2E]">
            <span className="bg-gradient-to-r from-[#F97316] to-[#FFCBA4] bg-clip-text text-transparent">
              Visitor Management System
            </span>
          </h1>
          <StepIndicator activeStep={activeStep} isOpen={isOpen} />
          <div className="h-[2px] w-16 bg-[#F97316] rounded-full"></div>
        </div>

        <div key={activeStep}>
          {activeStep === 1 && (
            <FormStepOne
              handleUserSubmit={handleUserSubmit}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              department={department}
              setDepartment={setDepartment}
              handleSelectedDepartment={(dept) =>
                setFormData((prev) => ({ ...prev, department: dept })) ||
                setDepartment(false)
              }
            />
          )}
          {activeStep === 2 && (
            <FormStepTwo
              handlePersonSubmit={handlePersonSubmit}
              handleSelectedPurpose={(purposeValue) =>
                setFormData((prev) => ({ ...prev, purpose: purposeValue })) ||
                setPurpose(false)
              }
              purpose={purpose}
              setPurpose={setPurpose}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              setActiveStep={setActiveStep}
            />
          )}
        </div>

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
    </div>
  );
};

export default VisitorPage;
