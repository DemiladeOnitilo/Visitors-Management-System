import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/2AM-logo-black.png";
import { FiUsers, FiShield, FiCalendar } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import MainButton from "../components/MainButton";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isStaffMode = searchParams.get("mode") === "staff";

  return (
    <div className="min-h-screen flex flex-col justify-between relative">

      <main className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-20 gap-10 relative z-10 w-full">
        <div className="flex-1 flex flex-col items-center text-center gap-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
            Welcome to{" "}
            <span>
              <img
                src={logo}
                alt="2AM TECH LIMITED"
                className="w-50 md:w-60 lg:w-70 mx-auto mt-2"
              />
            </span>
          </h1>

          <p className="text-slate-600 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            Manage your workplace visits efficiently—book, check in, and keep
            everyone informed with our streamlined, secure process.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
              <FiUsers className="text-orange-500" size={16} />
              <span className="text-sm font-semibold text-slate-700">
                Easy Registration
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
              <FiShield className="text-green-500" size={16} />
              <span className="text-sm font-semibold text-slate-700">
                Secure Process
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-700">
                Instant Confirmation
              </span>
            </div>
          </div>

          {/* Dynamic Trigger CTA Row */}
          {!isStaffMode ? (
            <div className="flex flex-col sm:flex-row gap-4 px-6 mt-2 w-full max-w-xl justify-center">
              <MainButton
                name="Book a Visit"
                onClick={() => navigate("/visitor")}
                variant="primary"
                arrowRight={true}
                className="w-full sm:w-1/2"
              />
              <a
                href="https://2am.ng/about/contact/"
                target="_blank"
                rel="noreferrer"
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 border border-white/50 hover:border-orange-200 text-center font-bold py-4 px-5 w-full sm:w-1/2 rounded-2xl text-md transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Contact Us
              </a>
            </div>
          ) : (
            <div className="px-6 mt-2 w-full max-w-sm justify-center">
              <MainButton
                name="Staff Gateway Access"
                onClick={() => navigate("/admin?mode=staff")}
                variant="primary"
                arrowRight={true}
                className="w-full"
              />
            </div>
          )}
        </div>

        <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/30 rounded-3xl blur-3xl"></div>
          <img
            src="https://media.istockphoto.com/id/1408468592/photo/happy-young-successful-female-receptionist-in-uniform-standing-by-counter.jpg?s=612x612&w=0&k=20&c=zaJWvFY00uVlz78_g39b_q7aG3YIikCVv2AvLaExrpc="
            alt="Visitors illustration"
            className="relative rounded-3xl shadow-2xl w-full h-[320px] md:h-[400px] object-cover border border-white/50"
          />
        </div>
      </main>

      {/* LOWER FEATURES ROW PANEL */}
      <section className="bg-white/95 backdrop-blur-sm py-12 px-6 relative z-10 border-t border-white/50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/20 pointer-events-none"></div>

        <div className={`max-w-7xl mx-auto grid grid-cols-1 gap-6 relative z-10 ${
          isStaffMode ? "md:grid-cols-1 max-w-md" : "md:grid-cols-2 lg:grid-cols-3"
        }`}>
          {!isStaffMode && (
            <div
              onClick={() => navigate("/visitor")}
              className="group bg-white/90 backdrop-blur-sm hover:bg-orange-50 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 hover:border-orange-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col gap-1 relative z-10">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl w-fit mb-2 shadow-lg">
                  <FaUserCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#F97316] group-hover:text-red-600 transition-colors duration-300">
                  I am a Visitor
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm font-semibold">
                  Schedule your visit, get a code, and enjoy a smooth entry with
                  our secure registration system.
                </p>
              </div>
            </div>
          )}

          {isStaffMode && (
            <div
              onClick={() => navigate("/admin?mode=staff")}
              className="group bg-white/90 backdrop-blur-sm hover:bg-slate-100 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-slate-300 hover:border-slate-400 relative overflow-hidden text-center items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-slate-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col gap-1 justify-center items-center relative z-10">
                <div className="bg-gradient-to-br from-[#3A3D46] to-slate-700 text-white p-3 rounded-xl w-fit mb-2 shadow-lg">
                  <FiShield size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#3A3D46] group-hover:text-slate-800 transition-colors duration-300">
                  Staff Control Gateway
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm font-semibold">
                  Admin & Reception operational pathways. Authenticated personnel session tokens required.
                </p>
              </div>
            </div>
          )}

          {!isStaffMode && (
            <a
              href="https://2am.ng/about/contact/"
              target="_blank"
              rel="noreferrer"
              className="group bg-white/90 backdrop-blur-sm hover:bg-blue-50 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 hover:border-blue-200 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex flex-col gap-1 justify-center items-start relative z-10">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-xl w-fit mb-2 shadow-lg">
                  <FiCalendar size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                  Contact Us
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm font-semibold">
                  Questions? Reach out to us for support, technical information, or
                  partnership opportunities.
                </p>
              </div>
            </a>
          )}
        </div>
      </section>

      <footer className="text-center text-slate-500 text-sm py-6 relative z-10 bg-white/50 backdrop-blur-sm border-t border-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} 2AM TECH LIMITED. All rights reserved.</p>
          <p className="text-xs mt-1 text-slate-400">Professional Visitor Management Solutions</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;