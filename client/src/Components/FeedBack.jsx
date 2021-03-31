import React from "react";
import "../Styles/FeedBack.css";

const FeedBack = ({ status, message }) => {
  return (
    <div className={`FeedBack ${status}`}>
      <p>{message}</p>
    </div>
  );
};

export default FeedBack;