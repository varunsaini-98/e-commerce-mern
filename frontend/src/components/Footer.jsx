import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h3>SHOPNEST</h3>
        <p>
          Your premier online fashion & lifestyle destination. High-quality
          products, fast delivery, and seamless customer service.
        </p>
      </div>

      <div>
        <h4>COMPANY</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/orders">Delivery & Orders</Link>
          </li>
          <li>
            <Link to="/contact">Privacy Policy & Contact</Link>
          </li>
        </ul>
      </div>

      <div>
        <h4>GET IN TOUCH</h4>
        <ul>
          <li>+1-202-555-0188</li>
          <li>support@shopnest.com</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
