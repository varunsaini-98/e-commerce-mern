import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <NavLink to="/admin/add">➕ Add Items</NavLink>
      <NavLink to="/admin/list">📋 List Items</NavLink>
      <NavLink to="/admin/orders">📦 Orders</NavLink>
    </div>
  );
};

export default AdminSidebar;
