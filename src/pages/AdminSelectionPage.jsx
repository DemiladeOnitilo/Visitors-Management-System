import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiMapPin, FiLogOut } from "react-icons/fi";
import TopBadge from "../components/TopBadge";
import MainHeader from "../components/MainHeader";

const AdminSelectionPage = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6 md:py-10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-red-50/20 pointer-events-none"></div>

      <main className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-10 pt-12 md:pt-0 relative z-10 flex-grow">
        
        {/* Upper Functional Action Bar */}
        <div className="w-full flex justify-end px-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold border border-white/50 shadow-md text-slate-700 hover:border-red-200 transition-all active:scale-95 cursor-pointer"
          >
            <FiLogOut size={16} className="text-red-500" />
            <span>Log Out</span>
          </button>
        </div>

        <TopBadge text="Control Panel" icon={<FiUsers size={14} />} />

        <MainHeader
          text="Welcome Back,"
          coloredText={admin?.name || "Admin"}
          subtext="Select an operational pathway below to handle expected building visitors or manage room reservation slots across the corporate workspace layout."
        />

        {/* Selection Cards Split Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-2">
          
          {/* Card Component 1: Visitor Forms Allocation */}
          <div
            onClick={() => navigate("/admin/form")}
            className="group bg-white/90 backdrop-blur-sm hover:bg-orange-50/50 cursor-pointer rounded-3xl p-8 flex flex-col gap-4 shadow-xl border border-white/20 hover:border-orange-200 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
          >
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-2xl w-fit shadow-lg">
              <FiUsers size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300 mb-1">
                Visitor Registration
              </h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Log expected guests, check appointments data entries, and create secure reception access token keys.
              </p>
            </div>
          </div>

          {/* Card Component 2: Meeting Room Timeline Scheduler */}
          <div
            onClick={() => navigate("/meeting-room")}
            className="group bg-white/90 backdrop-blur-sm hover:bg-orange-50/50 cursor-pointer rounded-3xl p-8 flex flex-col gap-4 shadow-xl border border-white/20 hover:border-orange-200 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
          >
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-2xl w-fit shadow-lg">
              <FiMapPin size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 group-hover:text-orange-600 transition-colors duration-300 mb-1">
                Meeting Rooms
              </h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Reserve building boardrooms, confirm calendar timeline availability matrix windows, and prevent multi-party block conflicts.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminSelectionPage;