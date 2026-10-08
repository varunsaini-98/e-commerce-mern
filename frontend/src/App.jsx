import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Storefront Pages
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import Verify from "./pages/Verify.jsx";

// Storefront Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar.jsx";

// Admin Components & Pages
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminNavbar from "./components/admin/AdminNavbar.jsx";
import AdminSidebar from "./components/admin/AdminSidebar.jsx";
import AdminAdd from "./pages/admin/AdminAdd.jsx";
import AdminList from "./pages/admin/AdminList.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";

const App = () => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || "",
  );
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  return (
    <div className="app-container">
      {/* Storefront Navigation */}
      <Navbar />
      <SearchBar />

      {/* Primary Application Routes */}
      <Routes>
        {/* Customer Storefront Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />

        {/* Admin Dashboard Portal */}
        <Route
          path="/admin/*"
          element={
            !adminToken ? (
              <AdminLogin
                setAdminToken={setAdminToken}
                backendUrl={backendUrl}
              />
            ) : (
              <div className="admin-portal-layout">
                <AdminNavbar setAdminToken={setAdminToken} />
                <div className="admin-body-content" style={{ display: "flex" }}>
                  <AdminSidebar />
                  <div
                    className="admin-page-view"
                    style={{ flex: 1, padding: "1.5rem" }}
                  >
                    <Routes>
                      <Route
                        path="add"
                        element={
                          <AdminAdd
                            adminToken={adminToken}
                            backendUrl={backendUrl}
                          />
                        }
                      />
                      <Route
                        path="list"
                        element={
                          <AdminList
                            adminToken={adminToken}
                            backendUrl={backendUrl}
                          />
                        }
                      />
                      <Route
                        path="orders"
                        element={
                          <AdminOrders
                            adminToken={adminToken}
                            backendUrl={backendUrl}
                          />
                        }
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            )
          }
        />
      </Routes>

      {/* Storefront Footer */}
      <Footer />
    </div>
  );
};

export default App;
