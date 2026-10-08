import React from "react";
import Title from "../components/Title.jsx";

const Contact = () => {
  return (
    <div className="contact-container">
      <Title text1={"CONTACT"} text2={"US"} />
      <div className="contact-details">
        <p>
          <strong>Customer Support:</strong> support@shopnest.com
        </p>
        <p>
          <strong>Phone:</strong> +1-202-555-0188
        </p>
        <p>
          <strong>Address:</strong> 123 E-Commerce Way, Suite 400, Tech City,
          USA
        </p>
      </div>
    </div>
  );
};

export default Contact;
