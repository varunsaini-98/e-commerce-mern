import React, { useState } from "react";
import axios from "axios";

const AdminLogin = ({ setAdminToken, backendUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        setAdminToken(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="admin-login-box">
      <h2>Admin Panel</h2>
      <input
        type="email"
        placeholder="Admin Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
