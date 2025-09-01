import React from "react";
import Modal from "react-modal";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import {
  FiShield,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

const SuccessModal = ({ formData, closeModal, isOpen, isVisitor }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(8px)",
        },
        content: {
          position: "static",
          inset: "unset",
          margin: "auto",
          border: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "30px",
          maxWidth: "min(620px, 90vw)",
          maxHeight: "min(90vh, 100vh)",
          width: "100%",
          padding: "0",
          boxShadow:
            "0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2)",
          overflow: "hidden",
          overflowY: "auto",
        },
      }}
    >
      <div className="relative">
        <div className="bg-gradient-to-r from-orange-500 to-red-600  p-6 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <FaCheckCircle className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Visit Confirmed!
            </h2>
            <p className="text-white/90 text-lg">
              {isVisitor
                ? "Your visit has been successfully registered"
                : "Visit entry created successfully"}
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-6 rounded-2xl mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FaShieldAlt className="text-orange-500 text-xl" />
              <span className="text-orange-700 font-semibold text-lg">
                Access Code
              </span>
            </div>
            <div className="text-4xl font-bold text-orange-600 tracking-wider font-mono bg-white rounded-xl py-3 px-6 inline-block shadow-sm">
              {formData.code}
            </div>
            <p className="text-sm text-orange-600 mt-2">
              Present this code at the reception
            </p>
          </div>

          {isVisitor && (
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-700 text-lg mb-4 flex items-center gap-2">
                <FiShield className="text-orange-500" />
                Visit Details
              </h3>

              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 bg-slate-50/70 backdrop-blur-sm rounded-xl border border-slate-200/50">
                  <FiUser
                    className="text-orange-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Visitor</p>
                    <p className="text-gray-800 font-semibold">
                      {formData.personName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50/70 backdrop-blur-sm rounded-xl border border-slate-200/50">
                  <FiMapPin
                    className="text-orange-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Host</p>
                    <p className="text-gray-800 font-semibold">
                      {formData.hostName}
                      <span className="text-orange-600 ml-1">
                        ({formData.department})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50/70 backdrop-blur-sm rounded-xl border border-slate-200/50">
                  <FiCalendar
                    className="text-orange-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Schedule
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {formData.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50/70 backdrop-blur-sm rounded-xl border border-slate-200/50">
                  <FiClock
                    className="text-orange-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Time</p>
                    <div className="flex flex-col text-gray-800 font-semibold">
                      <span>Time In: {formData.timeIn} </span>
                      <span>Time Out: {formData.timeOut}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50/70 backdrop-blur-sm rounded-xl border border-slate-200/50">
                  <FiShield
                    className="text-orange-500 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Purpose</p>
                    <p className="text-gray-800 font-semibold">
                      {formData.purpose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl mb-6">
            <div className="flex items-start gap-3">
              <FiShield
                className="text-blue-500 mt-0.5 flex-shrink-0"
                size={18}
              />
              <div>
                <h4 className="text-sm font-semibold text-blue-700 mb-1">
                  Security Notice
                </h4>
                <p className="text-xs text-blue-600 leading-relaxed">
                  This visit has been logged in our security system.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="relative w-full p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">
              {isVisitor ? "Create Another Visit" : "New Visit Entry"}
            </span>
            <span className="absolute inset-0 bg-[#3A3D46] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
