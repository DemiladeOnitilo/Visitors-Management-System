import React from "react";
import {
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiShield,
  FiInfo,
} from "react-icons/fi";
import InputField from "./InputField";

const FormStepOne = ({ handleUserSubmit, handleChange, formData, errors }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserSubmit(e);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full border border-orange-200">
          <FiBriefcase className="text-orange-600" size={18} />
          <span className="text-sm font-bold text-orange-700">
            Host Information
          </span>
        </div>
        <h3 className="text-3xl font-bold text-slate-800">
          Who are you visiting?
        </h3>
        <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
          Please provide details about your host and when you'd like to schedule
          your visit
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <InputField
          name="hostName"
          label="Host's Full Name"
          icon={<FiUser size={18} />}
          placeholder="e.g., Dr. Sarah Johnson"
          type="text"
          handleChange={handleChange}
          value={formData.hostName}
          error={errors.hostName}
        />

        <InputField
          name="department"
          label="Department / Division"
          icon={<FiBriefcase size={18} />}
          type="text"
          placeholder="e.g., Human Resources, Engineering, Marketing"
          handleChange={handleChange}
          value={formData.department}
          error={errors.department}
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

        <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <FiInfo size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-700 mb-1">
                Business Hours
              </h4>
              <p className="text-xs text-blue-600 leading-relaxed">
                Our offices are open Monday to Friday, 8:00 AM to 6:00 PM.
                Weekend visits may require special approval from your host.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg overflow-hidden group cursor-pointer relative shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Continue to Personal Information
            <FiArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </div>

      <div className="mt-8 p-5 bg-gray-50/80 rounded-2xl border border-gray-200">
        <div className="flex items-start gap-4">
          <FiShield
            size={18}
            className="text-orange-500 mt-0.5 flex-shrink-0"
          />
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-700">
              Privacy & Security Notice
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your visit information is securely encrypted and stored. We only
              share your details with your designated host for scheduling and
              security purposes. All data is handled in accordance with our
              privacy policy.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Encrypted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-500">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Secure Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStepOne;
