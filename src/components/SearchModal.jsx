import React from "react";
import Modal from "react-modal";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiTarget,
  FiHash,
  FiCheckCircle,
} from "react-icons/fi";
import { FaCheckCircle, FaUserTie } from "react-icons/fa";

const SearchModal = ({
  visitFoundModal,
  setVisitFoundModal,
  selectedVisit,
}) => {
  return (
    <Modal
      isOpen={visitFoundModal}
      onRequestClose={() => setVisitFoundModal(false)}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          zIndex: 9999,
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
      <div className="relative ">
        <div className="bg-gradient-to-r from-orange-500 to-red-600  p-6 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <FaCheckCircle className="text-white text-3xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Visit Found!</h2>
              <p className="text-white/90 text-lg">
                Here are the visit details
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-2xl">
                <FiUser size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedVisit?.personName}
                </h3>
                <p className="text-gray-600 font-medium">Visitor</p>
              </div>
            </div>

            <div className="mb-6">
              <span
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold shadow-lg ${
                  selectedVisit?.status === "Checked In"
                    ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                    : selectedVisit?.status === "Cancelled"
                    ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                    : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                }`}
              >
                <FiCheckCircle size={16} />
                {selectedVisit?.status || "Pending"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-2 rounded-xl">
                  <FaUserTie size={18} />
                </div>
                <h4 className="font-bold text-gray-800">Host Information</h4>
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {selectedVisit?.hostName}
              </p>
              <p className="text-gray-600 font-medium">
                {selectedVisit?.department}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-xl">
                  <FiTarget size={18} />
                </div>
                <h4 className="font-bold text-gray-800">Purpose</h4>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {selectedVisit?.purpose}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-2 rounded-xl">
                  <FiCalendar size={18} />
                </div>
                <h4 className="font-bold text-gray-800">Date</h4>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                {selectedVisit?.date || "N/A"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-2 rounded-xl">
                  <FiClock size={18} />
                </div>
                <h4 className="font-bold text-gray-800">Time</h4>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  <span>Time In:</span> {selectedVisit?.timeIn || "N/A"}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  <span>Time Out:</span> {selectedVisit?.timeOut || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border-2 border-orange-200 mb-8">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-2xl">
                <FiHash size={24} />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-gray-600 text-sm uppercase tracking-wide mb-1">
                  Visit Code
                </h4>
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {selectedVisit?.code}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setVisitFoundModal(false)}
            className="relative w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden group"
          >
            <span className="relative z-10 text-lg">Close</span>
            <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
