import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white to-gray-100">
      <main className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-10 md:py-20 gap-10">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1E1E1E] leading-tight">
            👋 Welcome to{" "}
            <span className="bg-gradient-to-r from-orange-500 to-yellow-300 bg-clip-text text-transparent">
              2am Tech
            </span>
          </h1>
          <p className="text-gray-700 text-xl md:text-2xl max-w-lg">
            Manage your workplace visits efficiently — book, check in, and keep
            everyone informed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => navigate("/visitor")}
              className="bg-[#F97316] hover:bg-[#3A3D46] text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 cursor-pointer"
            >
              Book a Visit
            </button>
            <a
              href="https://2am.ng/about/contact/"
              target="_blank"
              className="bg-white hover:bg-gray-200 text-[#2E2E2E] border border-[#F97316] font-bold py-4 px-10 rounded-full text-lg transition duration-300 cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="https://www.swipedon.com/hs-fs/hubfs/_SwipedOn%20Product%20Photography/SwipedOn%20Reception%202.jpg?width=817&height=544&name=SwipedOn%20Reception%202.jpg"
            alt="Visitors illustration"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />
        </div>
      </main>

      <section className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/visitor")}
            className="bg-orange-50 hover:bg-orange-100 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow transition-transform transform hover:scale-[1.02] duration-300"
          >
            <h3 className="text-xl font-bold text-[#F97316]">I am a Visitor</h3>
            <p className="text-gray-600">
              Schedule your visit, get a code, and enjoy a smooth entry.
            </p>
          </div>
          <div
            onClick={() => navigate("/admin")}
            className="bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow transition-transform transform hover:scale-[1.02] duration-300"
          >
            <h3 className="text-xl font-bold text-[#3A3D46]">Staff Login</h3>
            <p className="text-gray-600">
              Admin & Reception staff can manage visits and check-ins here.
            </p>
          </div>
          <a
            href="https://2am.ng/about/contact/"
            target="_blank"
            className="bg-white border border-gray-200 hover:border-gray-400 cursor-pointer rounded-2xl p-8 flex flex-col gap-4 shadow transition-transform transform hover:scale-[1.02] duration-300"
          >
            <h3 className="text-xl font-bold text-[#1E1E1E]">Contact Us</h3>
            <p className="text-gray-600">
              Questions? Reach out to us for support or information.
            </p>
          </a>
        </div>
      </section>

      <footer className="text-center text-gray-400 text-xs py-6">
        © {new Date().getFullYear()} 2am Tech. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
