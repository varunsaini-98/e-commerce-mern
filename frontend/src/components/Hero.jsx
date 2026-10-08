import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-banner">
      <div className="hero-text">
        <p className="subtitle">OUR BESTSELLERS</p>
        <h1>Latest Arrivals</h1>
        <Link to="/collection" className="shop-now-btn">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default Hero;
