import React, { useState, useEffect } from "react";
import { FiMail, FiPhone, FiUser, FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import InputField from "../components/InputField";
import SuccessModal from "../components/SuccessModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { purposeList } from "../components/purposeList";

const AdminForm = () => {
  const [formData, setFormData] = useState({
    personName: "",
    phoneNumber: "",
    email: "",
    purpose: "",
    date: "",
    time: "",
    code: "",
  });

  const [errors, setErrors] = useState({
    personName: "",
    phoneNumber: "",
    email: "",
    purpose: "",
    date: "",
    time: "",
  });

  const [purpose, setPurpose] = useState(false);
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
      time: "",
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

    // Simple validation
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

    if (!formData.personName || formData.personName.trim().split(/\s+/).length < 2) {
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

    if (!formData.time) {
      newErrors.time = "Please select a time";
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

  const handleSelectedPurpose = (selectedPurpose) => {
    setFormData((prev) => ({ ...prev, purpose: selectedPurpose }));
    setPurpose(false);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen">
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#2E2E2E] hover:text-[#F97316] font-semibold transition-colors duration-300 cursor-pointer"
      >
        <FiArrowLeft size={20} />
        Back
      </button>

      <div className="bg-white shadow-xl md:rounded-3xl max-w-xl w-full md:px-8 px-2 py-16">
        <div className="flex flex-col items-center gap-5 text-center ">
          <h1 className="text-4xl font-bold text-[#2E2E2E]">
            Welcome,{" "}
            <span className="bg-gradient-to-r from-[#F97316] to-[#FFCBA4] bg-clip-text text-transparent">
              {admin?.name || "Admin"}
            </span>
          </h1>
          <p className="text-xl text-gray-600 ">Set up a new visit</p>
          <div className="h-[2px] w-16 mx-auto bg-[#F97316] rounded-full"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-6 font-semibold"
        >
          <small className="text-gray-400">
            Fields marked with a{" "}
            <span className="text-red-400">*</span> are required
          </small>

          <InputField
            name="personName"
            label="Full Name"
            icon={<FiUser size={24} />}
            placeholder="Tom Dinkle"
            type="text"
            handleChange={handleChange}
            value={formData.personName}
            error={errors.personName}
          />

          <InputField
            name="phoneNumber"
            label="Phone Number"
            icon={<FiPhone size={24} />}
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
            label="Email"
            icon={<FiMail size={24} />}
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
            icon={<FaQuestion size={24} />}
            placeholder="Why are you visiting"
            handleChange={handleChange}
            value={formData.purpose}
            error={errors.purpose}
            dropdown={purpose}
            setDropdown={setPurpose}
            content={purposeList}
            handleSelected={handleSelectedPurpose}
            isDropDown={true}
          />

          <InputField
            name="date"
            label="Date"
            icon={<FiCalendar size={24} />}
            type="date"
            handleChange={handleChange}
            value={formData.date}
            error={errors.date}
          />

          <InputField
            name="time"
            label="Time"
            icon={<FiClock size={24} />}
            type="time"
            handleChange={handleChange}
            value={formData.time}
            error={errors.time}
          />

          <button className="w-full p-4 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300 ">
            Submit
          </button>
        </form>
      </div>

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
