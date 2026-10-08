import React from "react";
import Title from "../components/Title.jsx";

const PrivacyPolicy = () => {
  return (
    <div className="container section" style={{ maxWidth: "800px" }}>
      <Title text1={"PRIVACY"} text2={"POLICY"} />
      <div style={{ color: "var(--text-muted)", lineHeight: "1.8" }}>
        <h3>1. Information Collection</h3>
        <p>
          We collect user information such as name, email, and shipping address
          strictly to fulfill customer orders securely.
        </p>
        <h3 style={{ marginTop: "1.5rem" }}>2. Data Protection</h3>
        <p>
          Your password is cryptographically hashed using bcrypt, and payment
          data is processed directly by Stripe and Razorpay SDKs.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
