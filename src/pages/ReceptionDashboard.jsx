import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiSearch,
  FiUser,
  FiCalendar,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import Modal from "react-modal";
import DeleteModal from "../components/DeleteModal";
import SearchModal from "../components/SearchModal";

Modal.setAppElement("#root");

const ReceptionDashboard = () => {
  const [receptionist, setReceptionist] = useState(null);
  const [visits, setVisits] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [visitFoundModal, setVisitFoundModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedReceptionist = localStorage.getItem("receptionist");
    if (storedReceptionist) {
      setReceptionist(JSON.parse(storedReceptionist));
    } else {
      navigate("/admin/reception/login");
    }

    const storedVisits = JSON.parse(localStorage.getItem("visits")) || [];
    setVisits(storedVisits);
  }, [navigate]);

  const handleCodeCheck = () => {
    const found = visits.find(
      (visit) => visit.code === codeInput.trim().toUpperCase()
    );
    if (found) {
      setSelectedVisit(found);
      setVisitFoundModal(true);
    } else {
      toast.error("Visit code not found.", { autoClose: 3000 });
    }
  };

  const updateVisitStatus = (code, status) => {
    const updatedVisits = visits.map((visit) =>
      visit.code === code ? { ...visit, status } : visit
    );
    localStorage.setItem("visits", JSON.stringify(updatedVisits));
    setVisits(updatedVisits);
    toast.success(`Status updated to ${status}`);
  };

  const handleDeleteClick = (visit) => {
    setVisitToDelete(visit);
    setConfirmDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = visits.filter((v) => v.code !== visitToDelete.code);
    localStorage.setItem("visits", JSON.stringify(updated));
    setVisits(updated);
    toast.success("Visit deleted successfully.");
    setVisitToDelete(null);
    setConfirmDeleteModal(false);
  };

  const cancelDelete = () => {
    setVisitToDelete(null);
    setConfirmDeleteModal(false);
  };

  const filteredVisits = visits.filter((visit) => {
    if (filter === "All") return true;
    if (filter === "Pending" && !visit.status) return true;
    return visit.status === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 px-6 py-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-2xl shadow-lg">
            <FaUserTie size={28} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Welcome, {receptionist?.name || "Receptionist"}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Reception Dashboard
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("receptionist");
            navigate("/admin/reception/login");
          }}
          className="relative flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden group"
        >
          <span className="realtive z-10 text-white">
            <FiLogOut size={20} />
          </span>
          <span className="relative z-10">Log Out</span>
          <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-10">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <input
                className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-2xl px-6 py-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white/90 backdrop-blur-sm"
                type="text"
                placeholder="Enter visit code..."
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
              />
            </div>
            <button
              onClick={handleCodeCheck}
              className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <span className="text-white relative z-10">
                <FiSearch size={20} />
              </span>
              <span className="relative z-10 flex items-center justify-center gap-3">
                Check Code
                <FiArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </div>

          <div className="flex gap-3 flex-wrap justify-center lg:justify-end">
            {["All", "Pending", "Checked In", "Declined"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-3 rounded-2xl font-bold cursor-pointer transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg ${
                  filter === status
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white border-2 border-transparent shadow-lg"
                    : "bg-white/90 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredVisits.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <FiUser size={32} />
              </div>
              <p className="text-gray-500 text-xl font-semibold">
                {filter === "All" ? "No visits yet." : `No ${filter} visits.`}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Visits will appear here when they are scheduled
              </p>
            </div>
          </div>
        ) : (
          filteredVisits.map((visit) => (
            <div
              key={visit.code}
              className="bg-white/90 backdrop-blur-sm border-2 border-white/20 rounded-3xl shadow-xl p-8 flex flex-col justify-between gap-6 hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {visit.personName}
                  </h2>
                  <p className="text-gray-600 font-medium">{visit.purpose}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-2xl text-sm font-bold shadow-md ${
                    visit.status === "Checked In"
                      ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                      : visit.status === "Declined"
                      ? "bg-gradient-to-r from-red-400 to-red-600 text-white"
                      : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                  }`}
                >
                  {visit.status || "Pending"}
                </span>
              </div>

              <div className="bg-gray-50/80 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <FaUserTie className="text-orange-500" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Host
                    </p>
                    <p className="font-semibold text-gray-800">
                      {visit.hostName} ({visit.department})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-orange-500" size={14} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Date
                      </p>
                      <p className="font-semibold text-sm text-gray-800">
                        {visit.date || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-orange-500" size={14} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Time
                      </p>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">
                          <span>Time In:</span> {visit.timeIn || "N/A"}
                        </p>
                        <p className="font-semibold text-sm text-gray-800">
                          <span>Time Out:</span> {visit.timeOut || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Visit Code
                  </p>
                  <p className="font-bold text-lg text-orange-600">
                    {visit.code}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateVisitStatus(visit.code, "Declined")}
                    className="relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] overflow-hidden group"
                  >
                    <span className="relative z-10">Decline</span>
                  </button>
                  <button
                    onClick={() => updateVisitStatus(visit.code, "Checked In")}
                    className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] overflow-hidden group"
                  >
                    <span className="relative z-10">Check In</span>
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteClick(visit)}
                  className="relative w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] overflow-hidden group"
                >
                  <span className="relative z-10">Delete</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <SearchModal
        selectedVisit={selectedVisit}
        visitFoundModal={visitFoundModal}
        setVisitFoundModal={setVisitFoundModal}
        updateVisitStatus={updateVisitStatus}   
        handleDeleteClick={handleDeleteClick}
      />

      <DeleteModal
        confirmDelete={confirmDelete}
        confirmDeleteModal={confirmDeleteModal}
        visitToDelete={visitToDelete}
        cancelDelete={cancelDelete}
      />

      <ToastContainer />
    </div>
  );
};

export default ReceptionDashboard;
