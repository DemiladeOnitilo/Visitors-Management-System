import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiClock,
  FiShield,
} from "react-icons/fi";
import { FaQuestion, FaShieldAlt } from "react-icons/fa";
import InputField from "../components/InputField";
import SuccessModal from "../components/SuccessModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopBadge from "../components/TopBadge";
import BackButton from "../components/BackButton";
import MainButton from "../components/MainButton";
import MainHeader from "../components/MainHeader";

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
      navigate("/admin/login?mode=staff");
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
      createdBy: "Admin",
      status: "Pending",
    };

    const previousVisits = JSON.parse(localStorage.getItem("visits")) || [];
    previousVisits.push(visitorData);
    localStorage.setItem("visits", JSON.stringify(previousVisits));

    setFormData(visitorData);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-4 md:py-10 relative w-full">
      <BackButton
        text="Back to Dashboard"
        onClick={() => navigate("/admin/selection?mode=staff")}
      />

      <main className="w-full max-w-2xl flex flex-col items-center gap-6 md:gap-8 pt-16 md:pt-0 relative z-10 px-4">
        <TopBadge text="Visitor Management" icon={<FaShieldAlt size={14} />} />

        <MainHeader
          text="Welcome,"
          coloredText={admin?.name || "Admin"}
          subtext="Create a new visit entry with visitor details and schedule information cleanly managed inside local storage systems."
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 font-semibold bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-slate-300/40 w-full"
        >
          <p className="text-center text-xs md:text-sm text-gray-500 border-b border-slate-100 pb-2">
            Host:{" "}
            <span className="text-[#F97316]">{admin?.name || "Admin"}</span> •
            Department:{" "}
            <span className="text-[#F97316]">
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
            placeholder="Why are they visiting?"
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

          <MainButton
            name="Create Visit"
            variant="primary"
            arrowRight={true}
            onClick={handleSubmit}
          />

          <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-200 mt-2">
            <div className="flex items-start gap-3">
              <FiShield
                size={18}
                className="text-orange-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-0.5">
                  Audit Authentication Logged
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This visitor entry will be logged into your system tracking
                  history with an explicit provenance origin tag pointing
                  directly to your host profile.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>

      <SuccessModal
        isOpen={isOpen}
        closeModal={closeModal}
        formData={formData}
      />
      <ToastContainer />
    </div>
  );
};

export default AdminForm;
