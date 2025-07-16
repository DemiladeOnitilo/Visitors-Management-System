import React from "react";
import Modal from "react-modal";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = ({ formData, closeModal, isOpen, isVisitor }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
        content: {
          position: "static",
          inset: "unset",
          margin: "auto",
          border: "none",
          background: "white",
          borderRadius: "1.5rem",
          maxWidth: "480px",
          width: "90%",
          padding: "2rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      <div className="flex flex-col gap-4 text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto" />
        <h2 className="text-2xl font-bold text-[#2E2E2E] ">
          Submission Successful!
        </h2>
        <p className="text-gray-600 ">
          {isVisitor
            ? "Thank you for registering your visit."
            : "Thank you for your submission."}
        </p>

        <div className="bg-[#FFF4ED] p-4 rounded-xl text-left ">
          <p className="text-sm mb-2">
            <strong className="text-[#F97316]">Visitation Code:</strong>{" "}
            <span className="text-lg font-bold">{formData.code}</span>
          </p>
          {isVisitor && (
            <>
              <p className="text-sm">
                <strong>Visitor:</strong> {formData.personName}
              </p>
              <p className="text-sm">
                <strong>Host:</strong> {formData.hostName} (
                {formData.department})
              </p>
              <p className="text-sm">
                <strong>Date & Time:</strong> {formData.date} @ {formData.time}
              </p>
              <p className="text-sm">
                <strong>Purpose:</strong> {formData.purpose}
              </p>
            </>
          )}
        </div>

        <button
          onClick={closeModal}
          className="mt-4 bg-[#F97316] hover:bg-[#3A3D46] text-white font-semibold px-8 py-3 rounded-xl  transition-colors duration-300 cursor-pointer"
        >
          New Submission
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
