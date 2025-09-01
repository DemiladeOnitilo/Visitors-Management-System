import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiLock,
  FiShield,
  FiHeadphones,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";

const AdminSelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      title: "Administrative Panel",
      subtitle: "Full System Access",
      description:
        "Book visits and manage system configuration with administrative privileges",
      icon: FiShield,
      color: "from-orange-500 to-orange-600",
      hoverColor: "from-orange-600 to-orange-700",
      path: "/admin/login",
      features: [
        "Book Visits",
        "User Management",
        "System Analytics",
        "Report Generation",
      ],
    },
    {
      id: "reception",
      title: "Reception Desk",
      subtitle: "Visit Management",
      description:
        "Accept, check, cancel and manage visitor operations from the front desk",
      icon: FiHeadphones,
      color: "from-orange-400 to-orange-500",
      hoverColor: "from-orange-500 to-orange-600",
      path: "/admin/reception/login",
      features: [
        "Accept Visits",
        "Check Visit Status",
        "Cancel Visits",
        "Delete Visit Records",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-2xl shadow-lg hover:shadow-xl hover:text-orange-600 hover:scale-[1.02] md:px-6 md:py-4 p-4 font-semibold transition-all duration-300 cursor-pointer border border-white/50"
      >
        <FiArrowLeft size={20} />
        <span className="hidden md:block">Back Home</span>
      </button>

      <main className="w-full max-w-6xl flex flex-col items-center gap-10 relative z-10">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 mt-16 md:mt-0">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl shadow-lg">
            <FiLock size={25} />
          </div>
          <span className="font-semibold text-xl">VMS Access Portal</span>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Access Level
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select your role to access the visitor management system with
            appropriate permissions and tools
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {roles.map((role, index) => (
            <div
              key={index}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer ${
                selectedRole === role.id && "ring-2 ring-orange-500"
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="relative mb-6">
                <div
                  className={`inline-flex p-4 bg-gradient-to-br ${role.color} rounded-2xl shadow-lg`}
                >
                  <role.icon size={32} className="text-white" />
                </div>

                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow-sm">
                  <div className="w-full h-full bg-orange-400 rounded-full animate-ping"></div>
                </div>
              </div>
              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  {role.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 bg-gradient-to-r ${role.color} text-white text-sm font-medium rounded-full`}
                  >
                    {role.subtitle}
                  </span>
                  <FiTrendingUp size={16} className="text-orange-500" />
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">
                  {role.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {role.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-lg border border-gray-600"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-slate-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(role.path);
                  }}
                  className={`w-full py-4 bg-gradient-to-r ${role.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300 relative overflow-hidden cursor-pointer`}
                >
                  <span className="relative flex items-center justify-center gap-2">
                    Access {role.title}
                    <FiArrowRight
                      size={18}
                      className=" group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminSelectionPage;
