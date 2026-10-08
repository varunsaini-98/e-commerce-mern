import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="section-title">
      <h2>
        {text1} <span>{text2}</span>
      </h2>
      <div className="title-line"></div>
    </div>
  );
};

export default Title;
