import React from "react";
import "./start.css";
import logo from "../../assets/practipro.svg";

const Start = () => {
  return (
    <div className="introSection d-flex justify-content-center align-items-center">
      <div className="text-center">
        <img className="mb-4" src={logo} alt="PractiPro Logo" width="150" height="150" />
      </div>
    </div>
  );
};

export default Start;