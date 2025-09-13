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
import MainButton from "./MainButton";

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
          zIndex: 99999,
        },
        content: {
          position: "static",
          inset: "unset",
          margin: "auto",
          border: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          maxWidth: "min(520px, 92vw)", // Slightly adjusted width for better text breathing room
          maxHeight: "min(92vh, 100vh)",
          width: "100%",
          padding: "0",
          boxShadow:
            "0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2)",
          overflow: "hidden",
        },
      }}
    >
      <div className="flex flex-col max-h-[92vh] h-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 md:p-5 text-center relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-full mb-1.5">
              <FaCheckCircle className="text-white text-2xl md:text-3xl" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              Visit Confirmed!
            </h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base mt-0.5">
              {isVisitor
                ? "Your visit has been successfully registered"
                : "Visit entry created successfully"}
            </p>
          </div>
        </div>

        {/* Dynamic Card Body */}
        <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-4 overflow-hidden flex-grow">
          {/* Access Code Box (Top) */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 p-3 sm:p-4 rounded-xl text-center flex-shrink-0">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <FaShieldAlt className="text-orange-500 text-xs sm:text-sm" />
              <span className="text-orange-700 font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider">
                Access Code
              </span>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-600 tracking-widest font-mono bg-white rounded-lg py-2 px-5 inline-block shadow-sm border border-orange-100">
              {formData.code}
            </div>
            <p className="text-xs sm:text-sm font-medium text-orange-500 mt-1.5">
              Present this code at the reception
            </p>
          </div>

          {/* Visit Details Container - Safely scrollable ONLY if the viewport runs out of room */}
          {isVisitor && (
            <div className="flex flex-col gap-2 overflow-y-auto pr-1 flex-grow scrollbar-thin">
              <h3 className="font-bold text-gray-700 text-xs sm:text-sm md:text-base uppercase tracking-wider flex items-center gap-1.5 px-1 sticky top-0 bg-transparent py-0.5">
                <FiShield className="text-orange-500" size={16} />
                Visit Details
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/50 min-w-0">
                  <FiUser className="text-orange-500 flex-shrink-0" size={16} />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Visitor
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                      {formData.personName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/50 min-w-0">
                  <FiMapPin
                    className="text-orange-500 flex-shrink-0"
                    size={16}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Host
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                      {formData.hostName}{" "}
                      <span className="text-xs font-semibold text-orange-600">
                        ({formData.department})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/50 min-w-0">
                  <FiCalendar
                    className="text-orange-500 flex-shrink-0"
                    size={16}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Date
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                      {formData.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/50 min-w-0">
                  <FiClock
                    className="text-orange-500 flex-shrink-0"
                    size={16}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Timing
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                      {formData.timeIn} - {formData.timeOut}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-2.5 p-2.5 bg-slate-50/70 rounded-lg border border-slate-200/50 min-w-0">
                  <FiShield
                    className="text-orange-500 flex-shrink-0"
                    size={16}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Purpose
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">
                      {formData.purpose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Items Fixed Base */}
          <div className="space-y-3 mt-auto flex-shrink-0">
            <div className="bg-blue-50/80 border border-blue-100 p-2.5 rounded-lg flex items-center gap-2">
              <FiShield className="text-blue-500 flex-shrink-0" size={16} />
              <p className="text-xs sm:text-sm md:text-base font-medium text-blue-700 leading-tight">
                <strong>Notice:</strong> Visit logged securely in our system.
              </p>
            </div>

            <MainButton
              name={isVisitor ? "Create Another Visit" : "New Visit Entry"}
              variant="primary"
              onClick={closeModal}
              arrowRight={true}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
