import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiRefreshCw } from "react-icons/fi";
import Modal from "react-modal";

const RescheduleModal = ({ 
  isOpen, 
  onClose, 
  visit, 
  onReschedule 
}) => {
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
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-2xl">
            <FiRefreshCw size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Reschedule Visit</h2>
            <p className="text-gray-600">{visit?.personName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              New Date *
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                New Time In *
              </label>
              <input
                type="time"
                value={newTimeIn}
                onChange={(e) => setNewTimeIn(e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                New Time Out
              </label>
              <input
                type="time"
                value={newTimeOut}
                onChange={(e) => setNewTimeOut(e.target.value)}
                className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Reason for Reschedule
            </label>
            <textarea
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              placeholder="Optional reason for rescheduling..."
              rows="3"
              className="w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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