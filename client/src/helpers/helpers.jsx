import axios from "axios";
import { toast } from "react-toastify";
import { alertError, alertSuccess, loadError, loadSuccess } from "./alerts";
import { API_URL } from "./constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const getDataUserByKey = (key) => {
  const dataUser = JSON.parse(sessionStorage.getItem("user"));
  return dataUser && dataUser[key] ? dataUser[key] : null;
};
export const isAuthenticated = () => getDataUserByKey("username");
export const getRoleAuthenticated = () => {
  const getRol = getDataUserByKey("roleId");
  const roles = {
    1: 'Admin',
    2: 'Profesor',
    3: 'Alumno',
    4: 'Supervisor'
  }
  return roles[getRol]
};

export const allowAllUsers = [1, 2, 3, 4];
export const allowProfessorAndAdmin = [1, 2];
export const allowProfessorAndSupervisor = [2, 4];
export const allowAdmin = [1];
export const allowHigherStatus = [1,2,4];
export const allowStudent = [3];

export const getUserToken = () => {
  const dataUser = sessionStorage.getItem("token");
  return dataUser ? dataUser.replace(/^"(.*)"$/, "$1") : null;
};

export const deleteAxios = async (shortUrl) => {
  const load = toast.loading("Espere unos segundos...");
  try {
    const res = await axios({
      method: "DELETE",
      url: API_URL + shortUrl,
      headers: {
        Accept: "application/JSON",
        "auth-token": getUserToken(),
        "Content-Type": "application/json",
      },
    });
    toast.update(load, loadSuccess(res.data));
    return res;
  } catch (error) {
    console.log(error.response.data);
    return toast.update(load, loadError(error.response.data));
  }
};

export const waitAndRefresh = (path, time) => {
  setTimeout(() => {
    window.location.pathname = path;
  }, time);
};

export const deleteFile = async (nameFile, folder) => {
  try {
    await axios({
      url: `${API_URL}/file/delete-file?nameFile=${nameFile}&folder=${folder}`, //your url
      params: "",
      method: "GET",
      responseType: "blob", // important
    });
  } catch (error) {
    console.log(error);
  }
};


export const reqAxios = async (method, shortUrl, param, data) => {
  try {
    const res = await axios({
      method: method,
      url: API_URL + shortUrl,
      params: param,
      data: data,
      headers: {
        "auth-token": getUserToken(),
        /* "Content-Type": "application/json", */
      },
    });
    if (res.status && res.status === 200) {
      if (method !== "get") {
        alertSuccess(res.data.msg);
      }
      return res;
    }

  } catch (error) {
    alertError(error.response.data.msg);
    console.log(error);
    // if (error.response.status === 401) {
    //   sessionStorage.clear();
    //   alertError("La sesión expiró");
    //   return setTimeout(() => (window.location.href = URL_HOME), 3000);
    // }

    // if (error.response.status === 404) {
    //   return alertError("Error al conectar con el servidor");
    // }

    // alertError(error.response.data.msg, false);
    // return error;
  }
};

//Export in excel
export const reqAxiosDownload = async (shortUrl, param, nameFile) => {
  const load = toast.loading("Espere unos segundos...");
  try {
    await axios({
      url: API_URL + shortUrl, //your url
      params: param,
      method: "GET",
      responseType: "blob", // important
      headers: {
        Accept: "application/JSON",
        "Content-Type": "application/json",
        /*  "auth-token": token, */
      },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${nameFile}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
    return toast.update(load, loadSuccess("Datos descargados"));
  } catch (error) {
    console.log(error);
  }
};


// Traductor roles
export const translateRole = (roleName) => {
  const translations = {
    "admin": "Administrador",
    "student": "Estudiante",
    "supervisor": "Supervisor",
    "professor": "Profesor",
  };
  return translations[roleName] || roleName;
};

const exportTableToPDF = () => {
  const doc = new jsPDF();

  // Obtener la tabla de la página
  const table = document.getElementById("myTable");

  doc.text("Planilla Evaluación PPS", 14, 10); // Título del PDF

  autoTable(doc, { html: table, startY: 20 }); // Usa autoTable de forma explícita

  doc.save("tabla.pdf"); // Descargar el PDF
};

export default exportTableToPDF;