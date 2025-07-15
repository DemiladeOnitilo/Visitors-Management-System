import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminForm from "./pages/AdminForm";
import VisitorPage from "./pages/VisitorPage";
import LandingPage from "./pages/LandingPage";
import AdminSelectionPage from "./pages/AdminSelectionPage";
import ReceptionLogin from "./pages/ReceptionLogin";
import AdminLogin from "./pages/AdminLogin";
import MainLayout from "./layout/MainLayout";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import AdminSignup from "./pages/AdminSignup";
import ReceptionSignup from "./pages/ReceptionSignup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/visitor" element={<VisitorPage />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/reception/signup" element={<ReceptionSignup />} />
          <Route path="/admin" element={<AdminSelectionPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/reception/login" element={<ReceptionLogin />} />
          <Route path="/admin/form" element={<AdminForm />} />
          <Route path="/admin/reception/dashboard" element={<ReceptionDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
