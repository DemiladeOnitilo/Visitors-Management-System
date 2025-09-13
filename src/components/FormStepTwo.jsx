import React from "react";
import {
  FiMail,
  FiPhone,
  FiUser,
  FiArrowLeft,
  FiCheckCircle,
  FiCalendar,
  FiClock,
  FiBriefcase,
  FiShield,
} from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import InputField from "./InputField";
import MainButton from "./MainButton";

const FormStepTwo = ({
  setActiveStep,
  handlePersonSubmit,
  handleChange,
  formData,
  errors,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handlePersonSubmit(e);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Not specified";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3  max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full border border-orange-200">
          <FiUser className="text-orange-600" size={18} />
          <span className="text-xs md:text-sm font-bold text-orange-700">
            Personal Information
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
          Tell us about yourself
        </h3>
        <p className="text-sm md:text-xl text-slate-600 max-w-md mx-auto leading-relaxed">
          Please provide your contact details so we can process your visit
          registration
        </p>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <FiCalendar className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Visit Summary</h4>
            <p className="text-sm text-slate-600">
              Review your scheduled visit details
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FiUser className="text-orange-500 mt-1" size={16} />
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                  Host
                </span>
                <div className="font-bold text-slate-700 truncate">
                  {formData.hostName || "Not specified"}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiBriefcase className="text-orange-500 mt-1" size={16} />
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                  Department
                </span>
                <div className="font-bold text-slate-700 truncate">
                  {formData.department || "Not specified"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FiCalendar className="text-orange-500 mt-1" size={16} />
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                  Date
                </span>
                <div className="font-bold text-slate-700">
                  {formatDate(formData.date)}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiClock className="text-orange-500 mt-1" size={16} />
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                  Time
                </span>
                <div className="font-bold text-slate-700">
                  <span>Time In:</span> {formatTime(formData.timeIn)}
                </div>
                <div className="font-bold text-slate-700">
                  <span>Time Out:</span> {formatTime(formData.timeOut)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <InputField
          name="personName"
          label="Your Full Name"
          icon={<FiUser size={18} />}
          placeholder="e.g., John Michael Smith"
          type="text"
          handleChange={handleChange}
          value={formData.personName}
          error={errors.personName}
        />

        <InputField
          name="phoneNumber"
          label="Phone Number"
          icon={<FiPhone size={18} />}
          maxLength={11}
          inputMode="numeric"
          placeholder="e.g., 08123456789"
          type="tel"
          handleChange={handleChange}
          value={formData.phoneNumber}
          error={errors.phoneNumber}
        />

        <InputField
          name="email"
          label="Email Address"
          icon={<FiMail size={18} />}
          placeholder="e.g., john.smith@email.com"
          type="email"
          handleChange={handleChange}
          value={formData.email}
          error={errors.email}
          isOptional={true}
        />

        <InputField
          name="purpose"
          label="Purpose of Visit"
          icon={<FaQuestion size={18} />}
          placeholder="e.g., Business meeting, Job interview, Client consultation"
          type="text"
          handleChange={handleChange}
          value={formData.purpose}
          error={errors.purpose}
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
          <MainButton
            name="Back to Host Info"
            arrowLeft={true}
            onClick={() => setActiveStep(1)}
          />
          <MainButton
            name="Complete Registration"
            variant="primary"
            arrowRight={true}
            onClick={handleSubmit}
          />
        </div>
      </div>

      <div className="mt-8 p-5 bg-gray-50/80 rounded-2xl border border-gray-200">
        <div className="flex items-start gap-4">
          <FiShield
            size={18}
            className="text-orange-500 mt-0.5 flex-shrink-0"
          />
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              Almost There!
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              After submission, you'll receive a unique access code for your
              visit. Please keep it safe and present it at the reception desk
              upon arrival. Your host will also be automatically notified of
              your scheduled visit.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">
                  Instant confirmation
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Host notification</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-500">
                  Access code issued
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStepTwo;
