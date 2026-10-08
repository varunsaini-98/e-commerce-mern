import React, { useContext, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const { getCartCount, setShowSearch, token, setToken, setCartItems } =
    useContext(ShopContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Check if admin is logged in via localStorage
  const adminToken = localStorage.getItem("adminToken");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 400);
  };

  const customerLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const adminLogout = () => {
    localStorage.removeItem("adminToken");
    setIsDropdownOpen(false);
    navigate("/admin");
    window.location.reload(); // Refresh to update admin state
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand-logo">
        SHOPNEST
      </Link>

      <ul className="nav-links">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/collection">COLLECTION</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
      </ul>

      <div className="nav-actions">
        <button onClick={() => setShowSearch((prev) => !prev)}>🔍</button>

        {/* Profile Dropdown with Clear Account Role Indicators */}
        <div
          className="profile-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={() => (!token && !adminToken ? navigate("/login") : null)}
          >
            👤
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {/* ADMIN LOGGED IN */}
              {adminToken ? (
                <>
                  <div className="dropdown-status-badge admin-badge">
                    <strong>Logged in:</strong> Admin
                  </div>
                  <p
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin/add");
                    }}
                  >
                    Add Products
                  </p>
                  <p
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin/list");
                    }}
                  >
                    Product List
                  </p>
                  <p
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin/orders");
                    }}
                  >
                    Manage Orders
                  </p>
                  <p className="logout-text" onClick={adminLogout}>
                    Admin Logout
                  </p>
                </>
              ) : token ? (
                /* CUSTOMER LOGGED IN */
                <>
                  <div className="dropdown-status-badge customer-badge">
                    <strong>Logged in:</strong> Customer
                  </div>
                  <p
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/orders");
                    }}
                  >
                    My Orders
                  </p>
                  <p
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin");
                    }}
                  >
                    Admin Panel
                  </p>
                  <p className="logout-text" onClick={customerLogout}>
                    Logout
                  </p>
                </>
              ) : (
                /* NOT LOGGED IN */
                <>
                  <div className="dropdown-status-badge guest-badge">
                    Guest User
                  </div>
                  <p
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/login");
                    }}
                  >
                    Customer Login
                  </p>
                  <p
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin");
                    }}
                  >
                    Admin Login
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        <Link to="/cart" className="cart-icon">
          🛒 <span className="cart-badge">{getCartCount()}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
