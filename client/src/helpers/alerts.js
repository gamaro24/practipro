import "../App.css";
import { toast } from "react-toastify";

//devuelven la config de una alerta
export const loadSuccess = (msg, time = 3000) => {
  return {
    render: msg,
    type: "success",
    isLoading: false,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};
export const loadError = (msg, time = 3000) => {
  return {
    render: msg,
    type: "error",
    isLoading: false,
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};
//alertas
export const alertSuccess = (msg, time = 3000) => {
  return toast(msg, {
    position: "top-right",
    type: "success",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const alertError = (msg, time = 3000) => {
  return toast(msg, {
    position: "top-right",
    type: "error",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
