import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/2AM-logo-black.png";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 900);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [location]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[99999]"
          >
            <div className="relative flex items-center justify-center">
              
              {/* Premium CSS Spinning Accent Blur Ring - Added a subtle transparent track for depth */}
              <div 
                className="absolute w-24 h-24 md:w-34 md:h-34 rounded-full border-2 border-orange-500/10 border-t-orange-500 border-b-orange-600 animate-spin" 
                style={{ animationDuration: '1.2s' }} 
              />
              
              {/* Glowing Aura - Softened with a multi-layered opacity change */}
              <motion.div
                animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.15, 0.35, 0.15] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute w-20 h-20 md:w-30 md:h-30 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 blur-xl"
              />
              
              {/* Inner Logo Container */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: [0.97, 1.03, 0.97], opacity: 1 }}
                transition={{
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  opacity: { duration: 0.3 }
                }}
                className="relative w-20 h-20 md:w-30 md:h-30 rounded-full bg-white p-2 shadow-md flex items-center justify-center border border-gray-100"
              >
                {/* Fixed Image Fit: Changed object-cover to object-contain so nothing gets cut off */}
                <img
                  src={logo}
                  alt="2am tech logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
            
            </div>

            {/* Typography Depth: Shifted from generic gray to a warm slate color */}
            <motion.p 
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="text-xs md:text-md font-black tracking-[0.2em] text-slate-500 uppercase mt-8 ml-1.5"
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      )}
    </>
  );
};

export default MainLayout;