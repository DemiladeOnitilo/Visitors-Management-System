import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiSearch } from "react-icons/fi";
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
    <div className="min-h-screen bg-[#FFF4ED] px-6 py-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#2E2E2E]">
            Welcome, {receptionist?.name || "Receptionist"}
          </h1>
          <p className="text-gray-600">Reception Dashboard</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("receptionist");
            navigate("/admin/reception/login");
          }}
          className="self-start w-fit md:w-auto flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#3A3D46] text-white px-5 py-3 rounded-xl font-semibold transition-colors duration-300 cursor-pointer"
        >
          <FiLogOut size={18} />
          Log Out
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 w-full">
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <input
            className="border border-gray-400 rounded-xl px-4 py-3 w-full md:w-auto focus:outline-none"
            type="text"
            placeholder="Enter visit code..."
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
          />
          <button
            onClick={handleCodeCheck}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#3A3D46] text-white px-5 py-3 rounded-xl font-semibold transition-colors duration-300 cursor-pointer"
          >
            <FiSearch size={18} />
            Check Code
          </button>
        </div>

        <div className="flex gap-3 flex-wrap">
          {["All", "Pending", "Checked In", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full border font-semibold cursor-pointer transition-colors duration-300 ${
                filter === status
                  ? "bg-[#F97316] text-white border-transparent"
                  : "bg-white text-gray-700 border border-gray-400 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVisits.length === 0 ? (
          <p className="text-gray-500 text-lg col-span-full text-center">
            {filter === "All" ? "No visits yet." : `No ${filter} visits.`}
          </p>
        ) : (
          filteredVisits.map((visit) => (
            <div
              key={visit.code}
              className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col justify-between gap-4 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold text-[#2E2E2E]">
                    {visit.personName}
                  </h2>
                  <p className="text-sm text-gray-500">{visit.purpose}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    visit.status === "Checked In"
                      ? "bg-green-100 text-green-700"
                      : visit.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {visit.status || "Pending"}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-sm text-gray-700">
                <p>
                  <strong>Host:</strong> {visit.hostName} ({visit.department})
                </p>
                <p>
                  <strong>Date:</strong> {visit.date || "N/A"}
                </p>
                <p>
                  <strong>Time:</strong> {visit.time || "N/A"}
                </p>
                <p>
                  <strong>Code:</strong> {visit.code}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-3 mt-4">
                <button
                  onClick={() => updateVisitStatus(visit.code, "Cancelled")}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateVisitStatus(visit.code, "Checked In")}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                >
                  Check In
                </button>
                <button
                  onClick={() => handleDeleteClick(visit)}
                  className="flex-1 bg-[#F97316] hover:bg-[#3A3D46] text-white px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                >
                  Delete
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
