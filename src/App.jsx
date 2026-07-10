import React, { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AdminForm from "./pages/AdminForm";
import VisitorPage from "./pages/VisitorPage";
import LandingPage from "./pages/LandingPage";
import SelectionPage from "./pages/SelectionPage";
import AdminSelectionPage from "./pages/AdminSelectionPage";
import ReceptionLogin from "./pages/ReceptionLogin";
import AdminLogin from "./pages/AdminLogin";
import MainLayout from "./layout/MainLayout";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import ScrollToTop from "./components/ScrollToTop";
import MeetingRoomPage from "./pages/MeetingRoomPage";
import ProtectedRoute from "./components/ProtectedRoute";

// NEW: Global Synchronization Layer that keeps ?mode=staff pinned to the URL string
const ParamPreservationGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // If we have an active staff session state going but are missing the URL token, patch it instantly
    if (
      (localStorage.getItem("admin") || localStorage.getItem("receptionist")) &&
      searchParams.get("mode") !== "staff" &&
      location.pathname !== "/" &&
      location.pathname !== "/visitor"
    ) {
      searchParams.set("mode", "staff");
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [location, navigate]);

  return null;
};

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      {/* Mount our automatic URL key synchronizer inside the main layout view */}
      <ParamPreservationGuard />
      <MainLayout />
    </>
  );
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        {/* PUBLIC PATHWAYS */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/visitor" element={<VisitorPage />} />

        {/* GATEWAY LOGIN FORMS (Guarded from direct browser address bar input) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isLoginPage={true}>
              <SelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <ProtectedRoute isLoginPage={true}>
              <AdminLogin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reception/login"
          element={
            <ProtectedRoute isLoginPage={true}>
              <ReceptionLogin />
            </ProtectedRoute>
          }
        />

        {/* SECURE CORPORATE DASHBOARDS (Guarded by unique authorization profile sessions) */}
        <Route
          path="/admin/selection"
          element={
            <ProtectedRoute roleType="admin">
              <AdminSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/form"
          element={
            <ProtectedRoute roleType="admin">
              <AdminForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meeting-room"
          element={
            <ProtectedRoute roleType="admin">
              <MeetingRoomPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reception/dashboard"
          element={
            <ProtectedRoute roleType="receptionist">
              <ReceptionDashboard />
            </ProtectedRoute>
          }
        />
      </Route>,
    ),
  );

  return (
    <div className="max-w-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
