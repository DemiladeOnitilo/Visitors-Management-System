import React from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import InputField from "./InputField";
import { purposeList } from "./purposeList"; 

const FormStepTwo = ({
  setActiveStep,
  handlePersonSubmit,
  handleChange,
  setPurpose,
  handleSelectedPurpose,
  formData,
  errors,
  purpose,
}) => {


  return (
    <form
      onSubmit={handlePersonSubmit}
      className="flex flex-col gap-4 p-6 font-semibold"
    >
      <h3 className="text-2xl font-bold text-[#2E2E2E] text-center">
        Personal Information
      </h3>

      <InputField
        name="personName"
        label="Full Name"
        icon={<FiUser size={24} />}
        placeholder="Jane Doe"
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
        placeholder="08123456789"
        type="tel"
        handleChange={handleChange}
        value={formData.phoneNumber}
        error={errors.phoneNumber}
      />

      <InputField
        name="email"
        label="Email (Optional)"
        icon={<FiMail size={24} />}
        placeholder="jane@example.com"
        type="email"
        handleChange={handleChange}
        value={formData.email}
        error={errors.email}
        isOptional
      />

      <InputField
        name="purpose"
        label="Purpose of Visit"
        icon={<FaQuestion size={24} />}
        placeholder="Select a purpose"
        type="text"
        handleChange={handleChange}
        value={formData.purpose}
        error={errors.purpose}
        dropdown={purpose}
        setDropdown={setPurpose}
        content={purposeList}
        handleSelected={handleSelectedPurpose}
        isDropDown
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveStep(1)}
          className="w-full p-3 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full p-3 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] transition-colors duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormStepTwo;
