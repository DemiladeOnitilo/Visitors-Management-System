import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiUser,
  FiCalendar,
  FiClock,
  FiRefreshCw,
  FiChevronDown,
  FiChevronUp,
  FiBriefcase,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import DeleteModal from "../components/DeleteModal";
import SearchModal from "../components/SearchModal";
import RescheduleModal from "../components/RescheduleModal";
import MainButton from "../components/MainButton";

const ReceptionDashboard = () => {
  const [receptionist, setReceptionist] = useState(null);
  const [visits, setVisits] = useState([]);
  const [codeInput, setCodeInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [visitFoundModal, setVisitFoundModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [visitToReschedule, setVisitToReschedule] = useState(null);
  const [expandedVisits, setExpandedVisits] = useState({});
  const [showArchivedRooms, setShowArchivedRooms] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedReceptionist = localStorage.getItem("receptionist");
    if (storedReceptionist) {
      setReceptionist(JSON.parse(storedReceptionist));
    } else {
      navigate("/admin/reception/login?mode=staff");
    }

    const storedVisits = JSON.parse(localStorage.getItem("visits")) || [];
    setVisits(storedVisits);
  }, [navigate]);

  const toggleExpand = (code) => {
    setExpandedVisits((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleCodeCheck = () => {
    const found = visits.find(
      (visit) => visit.code === codeInput.trim().toUpperCase(),
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
      visit.code === code ? { ...visit, status } : visit,
    );
    localStorage.setItem("visits", JSON.stringify(updatedVisits));
    setVisits(updatedVisits);

    if (selectedVisit && selectedVisit.code === code) {
      setSelectedVisit({ ...selectedVisit, status });
    }
    toast.success(`Status updated to ${status}`);
  };

  const handleDeleteClick = (visit) => {
    setVisitToDelete(visit);
    setConfirmDeleteModal(true);
  };

  const handleRescheduleClick = (visit) => {
    setVisitToReschedule(visit);
    setRescheduleModal(true);
  };

  const handleReschedule = (rescheduledVisit) => {
    const updatedVisits = visits.map((visit) =>
      visit.code === rescheduledVisit.code ? rescheduledVisit : visit,
    );
    localStorage.setItem("visits", JSON.stringify(updatedVisits));
    setVisits(updatedVisits);
    toast.success("Visit rescheduled successfully!");
    setVisitToReschedule(null);
    setRescheduleModal(false);
    setVisitFoundModal(false);
  };

  const confirmDelete = () => {
    const updated = visits.filter((v) => v.code !== visitToDelete.code);
    localStorage.setItem("visits", JSON.stringify(updated));
    setVisits(updated);
    toast.success("Visit deleted successfully.");
    setVisitToDelete(null);
    setConfirmDeleteModal(false);
    setVisitFoundModal(false);
  };

  const cancelDelete = () => {
    setVisitToDelete(null);
    setConfirmDeleteModal(false);
  };

  // ==========================================================
  // MASTER MATRIX TIMELINE CALCULATIONS (VISITS + ROOMS)
  // ==========================================================
  const todayDate = new Date().toISOString().split("T")[0];

  // 1. Filter layout logic sorting current expected visitors vs historical archive records
  const filteredVisits = visits.filter((visit) => {
    const isPastVisit = visit.date && visit.date < todayDate;

    if (filter === "Archived") return isPastVisit; // Isolate past records completely
    if (isPastVisit) return false; // Hide old records from all active tabs automatically

    if (filter === "All") return true;
    if (filter === "Pending" && !visit.status) return true;
    return visit.status === filter;
  });

  // 2. Room allocations variables remain synchronized
  const allReservations =
    JSON.parse(localStorage.getItem("room_reservations")) || [];
  const activeRoomReservations = allReservations.filter(
    (room) => room.date >= todayDate,
  );
  const pastRoomReservations = allReservations.filter(
    (room) => room.date < todayDate,
  );

  // FIXED: Toggles exclusively to past operational reservations instead of mixing the arrays
  const displayedRooms = showArchivedRooms
    ? pastRoomReservations
    : activeRoomReservations;

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-red-50/20 pointer-events-none"></div>

      <main className="w-full max-w-7xl flex flex-col items-center gap-6 md:gap-8 relative z-10 flex-grow">
        {/* UPPER INFOBAR BRANDING ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4 max-w-7xl w-full">
          <div className="flex justify-between items-center w-full md:w-auto gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-2 rounded-2xl shadow-lg shrink-0">
                <FaUserTie size={44} />
              </div>
              <div className="flex flex-col gap-0.5 max-w-xs sm:max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight text-slate-800">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent block sm:inline">
                    {receptionist?.name || "Receptionist"}
                  </span>
                </h1>
                <p className="text-md md:text-xl text-slate-600 font-medium">
                  Reception Dashboard
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("receptionist");
                navigate("/admin/reception/login?mode=staff");
              }}
              className="block md:hidden p-3 rounded-xl bg-white border border-slate-300 text-slate-600 shadow-md active:scale-95 transition-transform cursor-pointer"
              aria-label="Log Out"
            >
              <FiLogOut size={20} className="text-red-500" />
            </button>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("receptionist");
              navigate("/admin/reception/login?mode=staff");
            }}
            className="hidden md:inline-flex group items-center justify-center font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200 cursor-pointer shadow-md border border-slate-300 hover:border-orange-200 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 gap-2"
          >
            <FiLogOut
              size={16}
              className="text-slate-500 group-hover:text-red-500 transition-colors"
            />
            Log Out
          </button>
        </div>

        {/* COMBINED TRACKER SECTION ROW */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT CONTAINER CHECK CODE MODULE */}
          <div className="flex flex-col gap-6 w-full lg:max-w-xl bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-slate-300 relative overflow-hidden shrink-0">
            <div className="relative z-10 flex flex-col gap-5 w-full">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="relative flex-1">
                  <input
                    className="w-full border-2 border-gray-200 focus:border-orange-500 rounded-2xl px-6 py-4 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-white"
                    type="text"
                    placeholder="Enter visit code..."
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                  />
                </div>
                <div className="w-full sm:w-auto shrink-0 flex">
                  <MainButton
                    name="Check Code"
                    variant="primary"
                    arrowRight={true}
                    onClick={handleCodeCheck}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap justify-center sm:justify-start items-center border-t border-slate-300 pt-4">
                {[
                  "All",
                  "Pending",
                  "Checked In",
                  "Declined",
                  "Rescheduled",
                  "Archived",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-2xl font-bold text-sm cursor-pointer transition-all duration-300 transform hover:scale-[1.02] shadow-sm ${
                      filter === status
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white border-2 border-transparent shadow-md"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER ROOM ALLOCATIONS MONITOR */}
          <div className="bg-white/90 backdrop-blur-sm border border-slate-300 rounded-3xl p-6 shadow-xl w-full flex-grow lg:max-w-2xl">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3 gap-4 flex-wrap">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FiBriefcase className="text-orange-500" />
                {showArchivedRooms
                  ? "Archived Room Reservations"
                  : "Today's Active Allocations"}
              </h3>

              {pastRoomReservations.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowArchivedRooms(!showArchivedRooms)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200/60 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  {showArchivedRooms ? (
                    <>
                      <FiEyeOff size={13} /> View Active (
                      {activeRoomReservations.length})
                    </>
                  ) : (
                    <>
                      <FiEye size={13} /> View Archived (
                      {pastRoomReservations.length})
                    </>
                  )}
                </button>
              )}
            </div>

            {displayedRooms.length === 0 ? (
              <p className="text-sm text-slate-400 font-semibold py-4">
                {showArchivedRooms
                  ? "No historical reservations exist."
                  : "No active boardrooms booked at this time framework layout."}
              </p>
            ) : (
              <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                {[...displayedRooms].reverse().map((room) => {
                  const isPast = room.date < todayDate;
                  return (
                    <div
                      key={room.id}
                      className={`flex justify-between items-center text-xs p-2.5 rounded-xl border font-semibold gap-4 shadow-sm transition-all ${
                        isPast
                          ? "bg-slate-100/70 border-slate-200 text-slate-400 line-through decoration-slate-300"
                          : "bg-slate-50 border-slate-200/60 text-slate-700"
                      }`}
                    >
                      <div className="min-w-0">
                        <span
                          className={`font-bold block sm:inline ${isPast ? "text-slate-400" : "text-slate-800"}`}
                        >
                          {room.roomName}
                        </span>
                        <span className="text-slate-400 font-medium sm:ml-2 block sm:inline">
                          ({room.timeIn} - {room.timeOut}) • {room.date}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <div className="shrink-0 text-right">
                          <span className="text-xs">Host: </span>
                          <span
                            className={`font-bold ${isPast ? "text-slate-400" : "text-orange-600"}`}
                          >
                            {room.bookedBy}
                          </span>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-xs">Purpose: </span>
                          <span
                            className={`font-bold ${isPast ? "text-slate-400" : "text-orange-600"}`}
                          >
                            {room.purpose}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* VISITS RECORD OVERVIEW COMPONENT OUTPUT MATRIX */}
        <div className="w-full flex-grow flex flex-col mt-4">
          {filteredVisits.length === 0 ? (
            <div className="flex-grow flex items-center justify-center py-12 w-full">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-slate-300 max-w-md mx-auto text-center w-full">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <FiUser size={28} />
                </div>
                <p className="text-gray-700 text-xl font-bold">
                  {filter === "Archived"
                    ? "No archived visit logs found."
                    : filter === "All"
                      ? "No visits scheduled today."
                      : `No active ${filter} visits found.`}
                </p>
                <p className="text-gray-400 text-sm mt-2 font-semibold">
                  Visits appear dynamically mapped matching chronological
                  parameters.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* DESKTOP MATRIX ROW CONTAINER */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {filteredVisits.map((visit) => {
                  const isPastVisit = visit.date && visit.date < todayDate;
                  return (
                    <div
                      key={visit.code}
                      className={`bg-white/90 backdrop-blur-sm border rounded-3xl shadow-xl p-6 flex flex-col justify-between gap-5 hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 group ${
                        isPastVisit
                          ? "border-slate-200 bg-slate-50/50 opacity-75"
                          : "border-slate-300"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h2
                                className={`text-xl font-bold tracking-tight group-hover:text-orange-600 transition-colors truncate ${
                                  isPastVisit
                                    ? "text-slate-400 line-through decoration-slate-300"
                                    : "text-gray-800"
                                }`}
                              >
                                {visit.personName}
                              </h2>
                              <span
                                className={`text-[10px] px-2 py-0.5 font-extrabold tracking-wide uppercase rounded-full shrink-0 ${
                                  isPastVisit
                                    ? "bg-slate-100 text-slate-400 border border-slate-200"
                                    : visit.createdBy === "Admin"
                                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                                      : "bg-purple-50 text-purple-600 border border-purple-200"
                                }`}
                              >
                                {visit.createdBy || "Visitor"}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-gray-500 truncate">
                              {visit.purpose}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-2xl text-xs font-bold shrink-0 shadow-sm text-white ${
                              isPastVisit
                                ? "bg-slate-400"
                                : visit.status === "Checked In"
                                  ? "bg-gradient-to-r from-green-400 to-green-600"
                                  : visit.status === "Declined"
                                    ? "bg-gradient-to-r from-red-400 to-red-600"
                                    : visit.status === "Rescheduled"
                                      ? "bg-gradient-to-r from-blue-400 to-purple-600"
                                      : "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            }`}
                          >
                            {isPastVisit
                              ? "Expired"
                              : visit.status || "Pending"}
                          </span>
                        </div>

                        <div className="bg-gray-50/80 rounded-2xl p-4 space-y-3 border border-gray-200/60 font-semibold">
                          <div className="flex items-start gap-2.5 text-sm">
                            <FiBriefcase
                              className="text-orange-500 mt-0.5"
                              size={14}
                            />
                            <div className="min-w-0">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                                Host
                              </p>
                              <p
                                className={`font-bold text-sm truncate ${isPastVisit ? "text-slate-400" : "text-gray-800"}`}
                              >
                                {visit.hostName}{" "}
                                <span className="text-orange-600 text-xs font-semibold">
                                  ({visit.department})
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-gray-200/60">
                            <div className="flex items-start gap-1.5">
                              <FiCalendar
                                className="text-orange-500 mt-0.5"
                                size={13}
                              />
                              <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                                  Date
                                </p>
                                <p
                                  className={`font-bold text-xs ${isPastVisit ? "text-slate-400" : "text-gray-800"}`}
                                >
                                  {visit.date || "N/A"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <FiClock
                                className="text-orange-500 mt-0.5"
                                size={13}
                              />
                              <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                                  Time Block
                                </p>
                                <p
                                  className={`font-bold text-[11px] truncate ${isPastVisit ? "text-slate-400" : "text-gray-800"}`}
                                >
                                  {visit.timeIn} - {visit.timeOut}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200/60 flex justify-between items-center">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                              Visit Code
                            </span>
                            <span className="font-mono font-black text-base text-orange-600 bg-white px-2.5 py-0.5 rounded-lg border border-orange-100 shadow-sm">
                              {visit.code}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 font-bold text-xs">
                        {isPastVisit ? (
                          <p className="text-center text-[11px] font-bold text-slate-400 py-2 bg-slate-100/60 border border-slate-200 rounded-xl">
                            Historical audit logs are locked from changes
                          </p>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateVisitStatus(visit.code, "Declined")
                                }
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-xl cursor-pointer shadow-sm font-bold transition-all transform hover:scale-[1.01]"
                              >
                                Decline
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  updateVisitStatus(visit.code, "Checked In")
                                }
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2.5 rounded-xl cursor-pointer shadow-sm font-bold transition-all transform hover:scale-[1.01]"
                              >
                                Check In
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-slate-600">
                              <button
                                type="button"
                                onClick={() => handleRescheduleClick(visit)}
                                className="bg-white border border-gray-200 hover:bg-gray-50 py-2 rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm font-bold cursor-pointer text-sm hover:text-orange-600 transform hover:scale-[1.01]"
                              >
                                <FiRefreshCw size={12} /> Reschedule
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteClick(visit)}
                                className="bg-white border border-transparent hover:border-red-100 text-gray-400 hover:text-red-600 py-2 rounded-xl transition-all shadow-sm font-bold cursor-pointer text-sm flex items-center justify-center gap-1 transform hover:scale-[1.01]"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MOBILE ACCORDION STACK VIEW */}
              <div className="block md:hidden space-y-3 w-full font-semibold">
                {filteredVisits.map((visit) => {
                  const isExpanded = !!expandedVisits[visit.code];
                  const isPastVisit = visit.date && visit.date < todayDate;
                  return (
                    <div
                      key={visit.code}
                      className={`bg-white/90 backdrop-blur-sm border rounded-2xl overflow-hidden shadow-lg w-full ${
                        isPastVisit
                          ? "border-slate-200 opacity-80"
                          : "border-white/50"
                      }`}
                    >
                      <div
                        onClick={() => toggleExpand(visit.code)}
                        className="p-4 flex items-center justify-between gap-3 active:bg-orange-50/50 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <h3
                              className={`font-bold text-base truncate ${isPastVisit ? "text-slate-400 line-through decoration-slate-300" : "text-gray-800"}`}
                            >
                              {visit.personName}
                            </h3>
                            <span className="font-mono font-black text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                              {visit.code}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 font-semibold truncate">
                            {visit.purpose} •{" "}
                            <span className="text-orange-600">
                              {visit.timeIn || "N/A"}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`px-2.5 py-0.5 rounded-xl text-[10px] font-bold text-white shadow-sm ${
                              isPastVisit
                                ? "bg-slate-400"
                                : visit.status === "Checked In"
                                  ? "bg-gradient-to-r from-green-400 to-green-600"
                                  : visit.status === "Declined"
                                    ? "bg-gradient-to-r from-red-400 to-red-600"
                                    : visit.status === "Rescheduled"
                                      ? "bg-gradient-to-r from-blue-400 to-purple-600"
                                      : "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            }`}
                          >
                            {isPastVisit
                              ? "Expired"
                              : visit.status || "Pending"}
                          </span>
                          {isExpanded ? (
                            <FiChevronUp className="text-gray-400" size={18} />
                          ) : (
                            <FiChevronDown
                              className="text-gray-400"
                              size={18}
                            />
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 bg-gray-50/50 border-t border-gray-100 space-y-4">
                          <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded-xl border border-gray-200/60 font-bold">
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                                Origin / Host
                              </p>
                              <p className="font-bold text-gray-800 mt-0.5 truncate">
                                {visit.hostName}
                              </p>
                              <p className="text-orange-600 text-[10px] truncate">
                                Src: {visit.createdBy || "Visitor"}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                                Date & Timeout
                              </p>
                              <p className="font-bold text-gray-700 mt-0.5">
                                {visit.date || "N/A"}
                              </p>
                              <p className="text-gray-400 text-[10px]">
                                Est. Exit: {visit.timeOut || "N/A"}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2 font-bold text-xs">
                            {isPastVisit ? (
                              <p className="text-center text-[10px] font-bold text-slate-400 py-2 bg-slate-100/60 rounded-xl">
                                Record context locked from changes
                              </p>
                            ) : (
                              <>
                                <div className="grid grid-cols-2 gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateVisitStatus(visit.code, "Declined")
                                    }
                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 rounded-xl shadow-sm cursor-pointer"
                                  >
                                    Decline
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateVisitStatus(
                                        visit.code,
                                        "Checked In",
                                      )
                                    }
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl shadow-sm cursor-pointer"
                                  >
                                    Check In
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-slate-600">
                                  <button
                                    type="button"
                                    onClick={() => handleRescheduleClick(visit)}
                                    className="bg-white border border-gray-200 py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                                  >
                                    <FiRefreshCw size={12} /> Reschedule
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteClick(visit)}
                                    className="bg-white border border-transparent text-gray-400 py-2.5 rounded-xl cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>

      <SearchModal
        selectedVisit={selectedVisit}
        visitFoundModal={visitFoundModal}
        setVisitFoundModal={setVisitFoundModal}
        updateVisitStatus={updateVisitStatus}
        handleDeleteClick={handleDeleteClick}
        handleRescheduleClick={handleRescheduleClick}
      />

      <DeleteModal
        confirmDelete={confirmDelete}
        confirmDeleteModal={confirmDeleteModal}
        visitToDelete={visitToDelete}
        cancelDelete={cancelDelete}
      />

      <RescheduleModal
        isOpen={rescheduleModal}
        onClose={() => setRescheduleModal(false)}
        visit={visitToReschedule}
        onReschedule={handleReschedule}
      />

      <ToastContainer />
    </div>
  );
};

export default ReceptionDashboard;
