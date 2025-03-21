import React, { useEffect, useContext, useState } from "react";
import "./start.css";
import logo from "../../assets/practipro.svg";

const Start = () => {

  return (
    <>
        <div className="introSection">
          <div className="divIntro">
            <h1 className="mb-4 pb-0">
             <img className="mb-4" src={logo} alt="" width="150" height="150"></img>
            </h1>
          </div>
        </div>
    </>
  );
};

export default Start;
