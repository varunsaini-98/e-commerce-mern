import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar.jsx";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminLogin from "./AdminLogin.jsx";

const AdminLayout = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  if (!token) {
    return <AdminLogin setToken={setToken} backendUrl={backendUrl} />;
  }

  return (
    <div style={{ backgroundColor: "var(--bg-main)", minHeight: "100vh" }}>
      <AdminNavbar setToken={setToken} />
      <div className="admin-wrapper">
        <AdminSidebar />
        <div className="admin-content">
          <Outlet context={{ token, backendUrl }} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
