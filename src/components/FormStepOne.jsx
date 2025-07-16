import React from "react";
import { FiUser, FiBriefcase, FiCalendar, FiClock } from "react-icons/fi";
import InputField from "./InputField";
import { departmentList } from "./departmentList"; 

const FormStepOne = ({
  handleUserSubmit,
  handleChange,
  formData,
  errors,
  department,
  setDepartment,
  handleSelectedDepartment,
}) => {


  return (
    <form onSubmit={handleUserSubmit} className="flex flex-col gap-4 p-6 font-semibold">
      <h3 className="text-2xl font-bold text-[#2E2E2E] text-center">Host Information</h3>
      <InputField
        name="hostName"
        label="Full Name"
        icon={<FiUser size={24} />}
        placeholder="John Doe"
        type="text"
        handleChange={handleChange}
        value={formData.hostName}
        error={errors.hostName}
      />

      <InputField
        name="department"
        label="Department"
        icon={<FiBriefcase size={24} />}
        type="text"
        placeholder="Select Department"
        handleChange={handleChange}
        value={formData.department}
        error={errors.department}
        dropdown={department}
        setDropdown={setDepartment}
        content={departmentList}
        handleSelected={handleSelectedDepartment}
        isDropDown
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

      <button
        type="submit"
        className="p-3 bg-[#F97316] text-white rounded-xl font-bold cursor-pointer hover:bg-[#3A3D46] hover:shadow-md transition duration-300"
      >
        Next
      </button>
    </form>
  );
};

export default FormStepOne;
