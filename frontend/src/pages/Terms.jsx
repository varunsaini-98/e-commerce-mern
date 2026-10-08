import React from "react";
import Title from "../components/Title.jsx";

const Terms = () => {
  return (
    <div className="container section" style={{ maxWidth: "800px" }}>
      <Title text1={"TERMS &"} text2={"CONDITIONS"} />
      <div style={{ color: "var(--text-muted)", lineHeight: "1.8" }}>
        <h3>1. Agreement to Terms</h3>
        <p>
          By accessing or using ShopNest, you agree to be bound by these terms
          of service and all applicable laws.
        </p>
        <h3 style={{ marginTop: "1.5rem" }}>2. Intellectual Property</h3>
        <p>
          All catalog media, trademarks, design systems, and code belong
          exclusively to ShopNest E-Commerce Inc.
        </p>
      </div>
    </div>
  );
};

export default Terms;
