import React from "react";

const AdminNavbar = ({ setAdminToken }) => {
  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken("");
  };

  return (
    <div className="admin-navbar">
      <h2>Admin Control Panel</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminNavbar;
