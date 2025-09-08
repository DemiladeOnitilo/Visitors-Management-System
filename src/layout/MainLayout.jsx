import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#FFF7F1] via-[#FFE6E6] to-[#FFD7B5] overflow-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-white flex items-center justify-center z-9999999"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-[#F97316] text-3xl font-bold"
            >
              Loading...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
        { location.pathname !== '/' && <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full mix-blend-multiply filter opacity-70 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter opacity-70 animate-pulse delay-1000"></div>

          <div className="absolute top-20 right-20 w-20 h-20 border border-orange-200/40 rounded-lg rotate-12 animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full animate-bounce delay-500"></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-br from-orange-200/40 to-red-200/40 transform rotate-45 animate-pulse"></div>
        </div>}
        <Outlet />
      </section>
    </div>
  );
};

export default MainLayout;
