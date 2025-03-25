import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { StateContext } from "./context/StateContext";
import CustomRoute from "./routes/CustomRoute";
//Fontawesome
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
      <BrowserRouter>
        <StateContext>
            <CustomRoute />
          </StateContext>
      </BrowserRouter>
      <div className="toastify-container">
        <ToastContainer />
      </div>
  </>
);