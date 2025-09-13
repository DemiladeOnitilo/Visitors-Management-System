import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiRefreshCw, FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import Modal from "react-modal";

const RescheduleModal = ({ isOpen, onClose, visit, onReschedule }) => {
  const [newDate, setNewDate] = useState("");
  const [newTimeIn, setNewTimeIn] = useState("");
  const [newTimeOut, setNewTimeOut] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");

  useEffect(() => {
    if (visit) {
      setNewDate(visit.date || "");
      setNewTimeIn(visit.timeIn || "");
      setNewTimeOut(visit.timeOut || "");
      setRescheduleReason("");
    }
  }, [visit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDate || !newTimeIn) {
      toast.error("Please fill in at least date and time in");
      return;
    }
    
    onReschedule({
      ...visit,
      date: newDate,
      timeIn: newTimeIn,
      timeOut: newTimeOut,
      rescheduleReason,
      status: "Rescheduled",
      originalDate: visit.date,
      originalTimeIn: visit.timeIn,
      originalTimeOut: visit.timeOut
    });
    onClose();
  };

  const handleClose = () => {
    setNewDate("");
    setNewTimeIn("");
    setNewTimeOut("");
    setRescheduleReason("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
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
          maxWidth: "min(480px, 92vw)",
          maxHeight: "min(92vh, 100vh)",
          width: "100%",
          padding: "0",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.2)",
          overflow: "hidden",
        },
      }}
    >
      <div className="flex flex-col max-h-[92vh] h-full">
        {/* THEME MATCH: Changed from blue/purple to orange/red gradient */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-5 text-center relative flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-2">
              <FiRefreshCw className="text-white text-2xl animate-spin-slow" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Reschedule Visit</h2>
            <p className="text-white/90 text-sm mt-0.5 font-medium">Updating itinerary for {visit?.personName}</p>
          </div>
        </div>

        {/* Form Body Container */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto flex-grow font-semibold">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FiCalendar className="text-orange-500" /> New Date *
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <FiClock className="text-orange-500" /> Time In *
              </label>
              <input
                type="time"
                value={newTimeIn}
                onChange={(e) => setNewTimeIn(e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <FiClock className="text-orange-500" /> Time Out
              </label>
              <input
                type="time"
                value={newTimeOut}
                onChange={(e) => setNewTimeOut(e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <FiFileText className="text-orange-500" /> Reason for Reschedule
            </label>
            <textarea
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              placeholder="Provide context or explanation..."
              rows="3"
              className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 resize-none"
            />
          </div>

          <div className="flex gap-4 mt-2 mt-auto">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3.5 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Reschedule
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RescheduleModal;