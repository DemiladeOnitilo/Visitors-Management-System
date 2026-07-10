import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiLock,
  FiShield,
  FiHeadphones,
  FiArrowRight,
  FiCheck,
} from "react-icons/fi";
import MainButton from "../components/MainButton";
import TopBadge from "../components/TopBadge";
import BackButton from "../components/BackButton";
import MainHeader from "../components/MainHeader";

const SelectionPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      title: "Administrative Panel",
      subtitle: "Full System Access",
      description:
        "Book visits, manage user permissions, and configure global system preferences with administrative control.",
      icon: FiShield,
      color: "from-orange-500 to-red-500",
      bgLight: "bg-orange-50/50",
      borderHover: "hover:border-orange-500/40",
      ringColor: "ring-orange-500",
      path: "/admin/login?mode=staff",
      features: [
        "Book System Visits",
        "User Management",
        "System Analytics",
        "Report Generation",
      ],
    },
    {
      id: "reception",
      title: "Reception Desk",
      subtitle: "Front Desk Operations",
      description:
        "Streamline visitor arrivals, verify credentials, monitor check-ins, and manage real-time traffic workflows.",
      icon: FiHeadphones,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50/50",
      borderHover: "hover:border-amber-500/40",
      ringColor: "ring-amber-500",
      path: "/admin/reception/login?mode=staff",
      features: [
        "Check Visit Status",
        "Process Check-ins",
        "Cancel Scheduled Visits",
        "Review Today's Records",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-8 relative overflow-x-hidden">
      <BackButton text="Back Home" onClick={() => navigate("/")} />

      <main className="w-full max-w-5xl flex flex-col items-center gap-6 md:gap-10 pt-16 md:pt-0 relative z-10">
        <TopBadge text="VMS Access Portal" icon={<FiLock size={14} />} />

        <MainHeader
          text="Choose Your"
          coloredText="Access Level"
          subtext="Select your operations profile below to access the management tools
            with your assigned clearance."
        />

        {/* Improved Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-2 sm:px-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                className={`group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 transition-all duration-300 relative flex flex-col justify-between ${role.borderHover} ${
                  isSelected
                    ? `shadow-xl ring-2 ${role.ringColor} border-transparent scale-[1.01]`
                    : "shadow-sm hover:shadow-md"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div>
                  {/* Icon Wrapper & Subtitle Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 bg-gradient-to-br ${role.color} text-white rounded-xl shadow-md shadow-orange-500/10`}
                    >
                      <IconComponent size={24} />
                    </div>
                    <span
                      className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-slate-200/70 transition-colors`}
                    >
                      {role.subtitle}
                    </span>
                  </div>

                  {/* Text Hierarchy */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2">
                    {role.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Clean Feature List Layout */}
                  <div className="space-y-2.5 mb-8">
                    {role.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 py-1 px-2 rounded-lg transition-colors group-hover:bg-slate-50/50"
                      >
                        <div
                          className={`flex-shrink-0 w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center`}
                        >
                          <FiCheck size={10} className="stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-600">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Action Button */}
                <MainButton
                  name="Enter Dashboard"
                  variant="primary"
                  arrowRight={true}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(role.path);
                  }}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SelectionPage;
