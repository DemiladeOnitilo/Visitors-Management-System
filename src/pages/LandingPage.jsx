import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiUsers, FiShield, FiCalendar } from "react-icons/fi";
import { FaUserTie, FaUserCheck } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-red-50/20 pointer-events-none"></div>
      
      <main className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-10 md:py-20 gap-10 relative z-10">
        <div className="flex-1 flex flex-col items-center text-center gap-8">
         
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
            👋 Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              2AM TECH 
              <br />
              LIMITED
            </span>
          </h1>
          
          <p className="text-slate-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
            Manage your workplace visits efficiently — book, check in, and keep
            everyone informed with our streamlined, secure process.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
              <FiUsers className="text-orange-500" size={16} />
              <span className="text-sm font-semibold text-slate-700">Easy Registration</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
              <FiShield className="text-green-500" size={16} />
              <span className="text-sm font-semibold text-slate-700">Secure Process</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-slate-700">Instant Confirmation</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => navigate("/visitor")}
              className="group bg-gradient-to-r from-[#F97316] to-red-500 hover:from-[#3A3D46] hover:to-slate-700 text-white text-center font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Book a Visit
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
            <a
              href="https://2am.ng/about/contact/"
              target="_blank"
              className="bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 border border-white/50 hover:border-orange-200 text-center font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/30 rounded-3xl blur-3xl"></div>
          <img
            src="https://media.istockphoto.com/id/1408468592/photo/happy-young-successful-female-receptionist-in-uniform-standing-by-counter.jpg?s=612x612&w=0&k=20&c=zaJWvFY00uVlz78_g39b_q7aG3YIikCVv2AvLaExrpc="
            alt="Visitors illustration"
            className="relative rounded-3xl shadow-2xl w-full object-cover border border-white/50"
          />
        </div>
      </main>

      <section className="bg-white/95 backdrop-blur-sm py-12 px-6 relative z-10 border-t border-white/50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-red-50/20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div
            onClick={() => navigate("/visitor")}
            className="group bg-white/90 backdrop-blur-sm hover:bg-orange-50 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 hover:border-orange-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-3 rounded-xl w-fit mb-2 shadow-lg">
                <FaUserCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#F97316] group-hover:text-red-600 transition-colors duration-300">I am a Visitor</h3>
              <p className="text-slate-600 leading-relaxed">
                Schedule your visit, get a code, and enjoy a smooth entry with our secure registration system.
              </p>
            </div>
          </div>
          
          <div
            onClick={() => navigate("/admin")}
            className="group bg-white/90 backdrop-blur-sm hover:bg-slate-50 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 hover:border-slate-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-slate-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-[#3A3D46] to-slate-700 text-white p-3 rounded-xl w-fit mb-2 shadow-lg">
                <FiShield size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#3A3D46] group-hover:text-slate-700 transition-colors duration-300">Staff Login</h3>
              <p className="text-slate-600 leading-relaxed">
                Admin & Reception staff can manage visits and check-ins with advanced controls.
              </p>
            </div>
          </div>
          
          <a
            href="https://2am.ng/about/contact/"
            target="_blank"
            className="group bg-white/90 backdrop-blur-sm hover:bg-blue-50 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/50 hover:border-blue-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-xl w-fit mb-2 shadow-lg">
                <FiCalendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">Contact Us</h3>
              <p className="text-slate-600 leading-relaxed">
                Questions? Reach out to us for support, information, or partnership opportunities.
              </p>
            </div>
          </a>
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