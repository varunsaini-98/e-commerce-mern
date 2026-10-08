import React from "react";
import Title from "../components/Title.jsx";

const About = () => {
  return (
    <div className="about-container">
      <Title text1={"ABOUT"} text2={"US"} />
      <div className="about-content">
        <p>
          Welcome to <strong>ShopNest</strong>, your premier destination for
          modern fashion, apparel, and lifestyle accessories. We are dedicated
          to delivering top-quality products, an intuitive shopping experience,
          and reliable delivery right to your door.
        </p>
        <p>
          Our application is built on the modern MERN stack to deliver a
          seamless, high-performance shopping experience for users worldwide.
        </p>
      </div>
    </div>
  );
};

export default About;
