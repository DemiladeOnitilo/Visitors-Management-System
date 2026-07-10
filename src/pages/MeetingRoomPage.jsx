import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FiCalendar,
  FiClock,
  FiBriefcase,
  FiUser,
  FiMapPin,
  FiPlus,
  FiCheckCircle,
  FiShield,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import MainHeader from "../components/MainHeader";
import TopBadge from "../components/TopBadge";
import BackButton from "../components/BackButton";
import MainButton from "../components/MainButton";
import InputField from "../components/InputField";

const MEETING_ROOMS = [
  { id: "room-1", name: "Boardroom A", capacity: "12 People" },
  { id: "room-2", name: "Alpha Innovation Hub", capacity: "6 People" },
  { id: "room-3", name: "Huddle Space Tech", capacity: "4 People" },
  { id: "room-4", name: "Executive Suite", capacity: "8 People" },
];

const MeetingRoomPage = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [reservations, setReservations] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [purpose, setPurpose] = useState("");
  const [bookerName, setBookerName] = useState("");

  // State tracking toggle control for historical archive arrays
  const [showArchived, setShowArchived] = useState(false);

  const [errors, setErrors] = useState({
    selectedRoom: "",
    bookingDate: "",
    timeIn: "",
    timeOut: "",
    purpose: "",
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdmin(parsedAdmin);
      setBookerName(parsedAdmin.name || "");
    } else {
      navigate("/admin/login?mode=staff");
    }

    const storedReservations =
      JSON.parse(localStorage.getItem("room_reservations")) || [];
    setReservations(storedReservations);
  }, [navigate]);

  const checkTimeConflict = (room, date, start, end) => {
    return reservations.some((res) => {
      if (res.roomName !== room || res.date !== date) return false;

      const parseTime = (t) => {
        const [h, m] = t.split(":").map(Number);
        return h + m / 60;
      };

      const newStart = parseTime(start);
      const newEnd = parseTime(end);
      const existingStart = parseTime(res.timeIn);
      const existingEnd = parseTime(res.timeOut);

      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!selectedRoom)
      newErrors.selectedRoom = "Please select a target meeting space";
    if (!bookingDate)
      newErrors.bookingDate = "Please choose a reservation date";
    if (!timeIn) newErrors.timeIn = "Please allocate an arrival time";
    if (!timeOut) newErrors.timeOut = "Please allocate a departure time";
    if (!purpose || purpose.trim().length < 3) {
      newErrors.purpose = "Please provide an explanatory session context";
    }

    if (timeIn && timeOut && timeIn >= timeOut) {
      newErrors.timeOut = "Time Out must be scheduled later than Time In";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please correct the highlighted allocation issues.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const hasConflict = checkTimeConflict(
      selectedRoom,
      bookingDate,
      timeIn,
      timeOut,
    );
    if (hasConflict) {
      toast.error(
        `${selectedRoom} is already reserved during this time layout framework on ${bookingDate}.`,
        { position: "top-right", autoClose: 4000 },
      );
      return;
    }

    const newReservation = {
      id: `ROOM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      roomName: selectedRoom,
      date: bookingDate,
      timeIn,
      timeOut,
      purpose,
      bookedBy: bookerName,
      department: admin?.department || "Operations",
    };

    const updatedReservations = [...reservations, newReservation];
    localStorage.setItem(
      "room_reservations",
      JSON.stringify(updatedReservations),
    );
    setReservations(updatedReservations);

    setPurpose("");
    setSelectedRoom("");
    toast.success("Meeting environment allocated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // ==========================================================
  // MASTER MATRIX TIMELINE CALCULATIONS
  // ==========================================================
  const todayDate = new Date().toISOString().split("T")[0];

  // Sort out current active items from historical expired data structures
  const activeReservations = reservations.filter(
    (res) => res.date >= todayDate,
  );
  const pastReservations = reservations.filter((res) => res.date < todayDate);

  // FIXED: Toggles exclusively to past reservations instead of combining the arrays
  const displayedReservations = showArchived
    ? pastReservations
    : activeReservations;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6 md:py-10 relative">
      <BackButton
        text="Back to Dashboard"
        onClick={() => navigate("/admin/selection?mode=staff")}
      />

      <main className="w-full max-w-7xl flex flex-col items-center gap-6 md:gap-10 pt-16 md:pt-0 relative z-10 flex-grow">
        <TopBadge text="Workspace Allocation" icon={<FiMapPin size={14} />} />

        <MainHeader
          text="Reserve a"
          coloredText="Meeting Room"
          subText="Coordinate multi-room bookings across structural schedules dynamically without resource conflicts."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start mt-2">
          {/* LEFT FORM BLOCK */}
          <form
            onSubmit={handleBookingSubmit}
            className="lg:col-span-5 flex flex-col gap-5 font-semibold bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/20 w-full"
          >
            <p className="text-center text-sm text-gray-500 font-semibold border-b border-slate-100 pb-2">
              Booker:{" "}
              <span className="text-[#F97316]">{bookerName || "Admin"}</span> •
              Dept:{" "}
              <span className="text-[#F97316]">
                {admin?.department || "Admin Department"}
              </span>
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-2">
                <span className="text-orange-500">
                  <FiMapPin size={15} />
                </span>
                <span className="text-sm">Select Meeting Workspace</span>
                <span className="text-red-500 text-lg">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedRoom}
                  onChange={(e) => {
                    setSelectedRoom(e.target.value);
                    setErrors((prev) => ({ ...prev, selectedRoom: "" }));
                  }}
                  className={`w-full h-14 px-4 py-3 bg-slate-50/50 border-2 rounded-xl font-medium text-base md:text-sm text-slate-700 focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
                    errors.selectedRoom
                      ? "border-red-400 bg-red-50/50 focus:border-red-500"
                      : selectedRoom
                        ? "border-green-400 bg-green-50/30"
                        : "border-slate-200 hover:border-slate-300 focus:border-orange-400 focus:bg-white"
                  }`}
                >
                  <option value="">-- Choose Workspace --</option>
                  {MEETING_ROOMS.map((room) => (
                    <option key={room.id} value={room.name}>
                      {room.name} ({room.capacity})
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
                  <FiMapPin size={16} />
                </div>
              </div>
              {errors.selectedRoom && (
                <span className="text-red-600 text-sm font-medium flex items-center gap-2 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {errors.selectedRoom}
                </span>
              )}
            </div>

            <InputField
              name="bookingDate"
              label="Schedule Target Date"
              icon={<FiCalendar size={15} />}
              type="date"
              handleChange={(e) => {
                setBookingDate(e.target.value);
                setErrors((prev) => ({ ...prev, bookingDate: "" }));
              }}
              value={bookingDate}
              error={errors.bookingDate}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                name="timeIn"
                label="Time In"
                icon={<FiClock size={15} />}
                type="time"
                handleChange={(e) => {
                  setTimeIn(e.target.value);
                  setErrors((prev) => ({ ...prev, timeIn: "" }));
                }}
                value={timeIn}
                error={errors.timeIn}
              />

              <InputField
                name="timeOut"
                label="Time Out"
                icon={<FiClock size={15} />}
                type="time"
                handleChange={(e) => {
                  setTimeOut(e.target.value);
                  setErrors((prev) => ({ ...prev, timeOut: "" }));
                }}
                value={timeOut}
                error={errors.timeOut}
              />
            </div>

            <InputField
              name="purpose"
              label="Reservation Purpose"
              icon={<FaQuestion size={14} />}
              placeholder="Why are you allocating this environment?"
              type="text"
              handleChange={(e) => {
                setPurpose(e.target.value);
                setErrors((prev) => ({ ...prev, purpose: "" }));
              }}
              value={purpose}
              error={errors.purpose}
            />

            <MainButton
              name="Confirm Allocation"
              variant="primary"
              arrowRight={true}
              onClick={handleBookingSubmit}
            />
          </form>

          {/* RIGHT COLUMN LIST - Handled dynamically with custom Archive toggling support */}
          <div className="lg:col-span-7 w-full flex flex-col gap-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-slate-300 w-full">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4 gap-4 flex-wrap">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FiCalendar className="text-orange-500" />
                  {showArchived
                    ? "Archived Room Reservations"
                    : "Current Allocations Tracker"}
                </h3>

                {/* UPGRADED Toggle button to switch between Active views and historical Archive maps */}
                {pastReservations.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowArchived(!showArchived)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200/60 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {showArchived ? (
                      <>
                        <FiEyeOff size={13} /> View Active (
                        {activeReservations.length})
                      </>
                    ) : (
                      <>
                        <FiEye size={13} /> View Past Bookings (
                        {pastReservations.length})
                      </>
                    )}
                  </button>
                )}
              </div>

              {displayedReservations.length === 0 ? (
                <div className="text-center py-16 text-gray-400 font-semibold">
                  <FiBriefcase
                    size={36}
                    className="mx-auto mb-4 text-gray-300"
                  />
                  {showArchived
                    ? "No historical reservations logged."
                    : "No active workspace room allocations locked across records today."}
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[510px] overflow-y-auto pr-1">
                  {[...displayedReservations].reverse().map((res) => {
                    const isPast = res.date < todayDate;
                    return (
                      <div
                        key={res.id}
                        className={`bg-white border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 ${
                          isPast
                            ? "border-slate-200 bg-slate-50/50 opacity-75"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className={`font-extrabold text-base tracking-tight ${isPast ? "text-slate-400 line-through decoration-slate-300" : "text-gray-800"}`}
                            >
                              {res.roomName}
                            </span>
                            <span className="font-mono text-[10px] font-black bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded-lg">
                              {res.id}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-slate-500 truncate mb-2">
                            {res.purpose}
                          </p>

                          <div className="flex gap-4 items-center text-xs text-slate-400 font-bold flex-wrap">
                            <span className="flex items-center gap-1">
                              <FiCalendar className="text-orange-500" />{" "}
                              {res.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <FiClock className="text-orange-500" />{" "}
                              {res.timeIn} - {res.timeOut}
                            </span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100 font-semibold flex flex-row sm:flex-col justify-between items-end gap-2 w-full sm:w-auto">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Reserved By
                            </p>
                            <p className="text-sm font-bold text-slate-700 flex items-center sm:justify-end gap-1 mt-0.5">
                              <FiUser size={13} className="text-slate-400" />{" "}
                              {res.bookedBy}
                            </p>
                            <p className="text-xs text-orange-500 font-medium">
                              {res.department}
                            </p>
                          </div>

                          {isPast ? (
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border tracking-wide uppercase">
                              Expired
                            </span>
                          ) : (
                            admin &&
                            admin.name === res.bookedBy && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Are you sure you want to release the booking for ${res.roomName}?`,
                                    )
                                  ) {
                                    const filtered = reservations.filter(
                                      (r) => r.id !== res.id,
                                    );
                                    localStorage.setItem(
                                      "room_reservations",
                                      JSON.stringify(filtered),
                                    );
                                    setReservations(filtered);
                                    toast.success(
                                      "Reservation released successfully.",
                                    );
                                  }
                                }}
                                className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/60 px-2.5 py-1 rounded-lg transition-colors cursor-pointer transform active:scale-95 transition-transform"
                              >
                                Cancel Booking
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default MeetingRoomPage;
