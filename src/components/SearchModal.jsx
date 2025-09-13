import React from "react";
import Modal from "react-modal";
import {
  FiUser,
  FiCalendar,
  FiClock,
  FiTarget,
  FiHash,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import MainButton from "./MainButton";

const SearchModal = ({
  visitFoundModal,
  setVisitFoundModal,
  selectedVisit,
  updateVisitStatus,
  handleDeleteClick,
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
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          zIndex: 99999, // Layer fix over dashboard
        },
        content: {
          position: "static",
          inset: "unset",
          margin: "auto",
          border: "none",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          maxWidth: "min(560px, 92vw)",
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
        {/* Header Branding Row */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-5 text-center relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-2">
              <FiCheckCircle className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Visit Record Located
            </h2>
            <p className="text-white/90 text-sm font-medium mt-0.5">
              Real-time log validation profile
            </p>
          </div>
        </div>

        {/* Details Wrapper Area */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-grow font-semibold">
          {/* Identification Row */}
          <div className="flex justify-between items-center bg-slate-50/80 rounded-2xl p-4 border border-slate-300/60">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-2.5 rounded-xl shrink-0">
                <FiUser size={20} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    {selectedVisit?.personName}
                  </h3>

                  {/* NEW: Audit Provenance Origin Tag Badge */}
                  <span
                    className={`text-[10px] px-2 py-0.5 font-extrabold tracking-wide uppercase rounded-full ${
                      selectedVisit?.createdBy === "Admin"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "bg-purple-50 text-purple-600 border border-purple-200"
                    }`}
                  >
                    {selectedVisit?.createdBy || "Visitor"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Visitor Name
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-2xl text-xs font-bold text-white shadow-sm shrink-0 ${
                selectedVisit?.status === "Checked In"
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : selectedVisit?.status === "Declined"
                    ? "bg-gradient-to-r from-red-400 to-red-600"
                    : "bg-gradient-to-r from-yellow-400 to-yellow-600"
              }`}
            >
              {selectedVisit?.status || "Pending"}
            </span>
          </div>

          {/* Quick Management Triggers */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => updateVisitStatus(selectedVisit.code, "Declined")}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={() =>
                updateVisitStatus(selectedVisit.code, "Checked In")
              }
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Check In
            </button>
            <button
              onClick={() => handleDeleteClick(selectedVisit)}
              className="bg-white border border-gray-200 hover:border-red-200 text-gray-500 hover:text-red-600 py-2.5 rounded-xl font-bold shadow-sm transition-colors cursor-pointer"
            >
              Delete Log
            </button>
          </div>

          {/* Metadata Infobox Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-300">
              <div className="flex items-center gap-2 mb-1.5 text-xs text-gray-400 uppercase tracking-wider font-bold">
                <FaUserTie className="text-orange-500" /> Host Account
              </div>
              <p className="font-bold text-gray-800 truncate">
                {selectedVisit?.hostName}
              </p>
              <p className="text-xs text-orange-600 truncate">
                {selectedVisit?.department}
              </p>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-300">
              <div className="flex items-center gap-2 mb-1.5 text-xs text-gray-400 uppercase tracking-wider font-bold">
                <FiTarget className="text-orange-500" /> Destination Intent
              </div>
              <p className="font-bold text-gray-800 line-clamp-2 leading-snug">
                {selectedVisit?.purpose}
              </p>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-300">
              <div className="flex items-center gap-2 mb-1.5 text-xs text-gray-400 uppercase tracking-wider font-bold">
                <FiCalendar className="text-orange-500" /> Date Calendar
              </div>
              <p className="font-bold text-gray-800">
                {selectedVisit?.date || "N/A"}
              </p>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-300">
              <div className="flex items-center gap-2 mb-1.5 text-xs text-gray-400 uppercase tracking-wider font-bold">
                <FiClock className="text-orange-500" /> Time Windows
              </div>
              <p className="font-bold text-gray-800 text-xs">
                In: {selectedVisit?.timeIn || "N/A"}
              </p>
              <p className="text-gray-500 text-[11px]">
                Out: {selectedVisit?.timeOut || "N/A"}
              </p>
            </div>
          </div>

          {/* Large Access Code Indicator */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2.5">
              <FiHash size={18} className="text-orange-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                Security Token
              </span>
            </div>
            <span className="font-mono font-black text-xl text-orange-600 bg-white border border-orange-100 shadow-sm px-3 py-0.5 rounded-lg">
              {selectedVisit?.code}
            </span>
          </div>

          <MainButton
            name="Dismiss Review"
            variant="primary"
            onClick={() => setVisitFoundModal(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
