import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { HourContext } from "./HourContext";
import HourReducer from "./HourReducer";
import { alertSuccess } from "../../helpers/alerts";
import { format, parseISO } from "date-fns";
import moment from "moment-timezone";

export const HourState = ({ children }) => {
  const initialState = {
    hourData: {
      id: "",
      dateFrom: "",
      dateTo: "",
      institutionId: "",
      universityId: "",
      carrerId: "",
    },
    hours: [],
    hoursFiltered: [],
    totalHoursPages: 0,
    evaluatorsChino: [],
    evaluatorsSelector: [],
  };
  const [state, dispatch] = useReducer(HourReducer, initialState);


  const createNewHour = async (hour) => {
    try {
      const data = await reqAxios("POST", `/hour/create`, "", hour);
      alertSuccess(data.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const getHourData = async (id) => {
    const dataHour = await reqAxios("GET", `/hour/get/${id}`, "", "");

    if (dataHour.data.hour.dateFrom) {
      const parsedDateFrom = parseISO(dataHour.data.hour.dateFrom);  // Parse ISO string safely
      if (!isNaN(parsedDateFrom)) {  // Check if it's a valid date
        dataHour.data.hour.dateFrom = format(parsedDateFrom, "dd-MM-yyyy'T'HH:mm");
      }
    }

    if (dataHour.data.hour.dateTo) {
      const parsedDateTo = parseISO(dataHour.data.hour.dateTo);
      if (!isNaN(parsedDateTo)) {
        dataHour.data.hour.dateTo = format(parsedDateTo, "dd-MM-yyyy'T'HH:mm");
      }
    }

    dispatch({
      type: "GET_HOUR_DATA",
      payload: dataHour.data.hour,
    });
  };

  const getHourDataEdit = async (id) => {
    const dataHour = await reqAxios("GET", `/hour/get/${id}`, "", "");

    if (dataHour.data.hour.dateFrom) {
      const parsedDateFrom = parseISO(dataHour.data.hour.dateFrom);  // Parse ISO string safely
      if (!isNaN(parsedDateFrom)) {  // Check if it's a valid date
        dataHour.data.hour.dateFrom = format(parsedDateFrom, "yyyy-MM-dd'T'HH:mm:ss");
      }
    }

    if (dataHour.data.hour.dateTo) {
      const parsedDateTo = parseISO(dataHour.data.hour.dateTo);
      if (!isNaN(parsedDateTo)) {
        dataHour.data.hour.dateTo = format(parsedDateTo, "yyyy-MM-dd'T'HH:mm:ss");
      }
    }

    dispatch({
      type: "GET_HOUR_DATA_EDIT",
      payload: dataHour.data.hour,
    });
  };


  const getAllHours = async () => {
    const getAllHour = await reqAxios("GET", "/hour/getall", "", "");

    const formatHours = getAllHour.data.hours.map(hour => {

      // Ensure dates are valid before formatting
      if (hour.dateFrom) {
        const parsedDateFrom = parseISO(hour.dateFrom);  // Parse ISO string safely
        if (!isNaN(parsedDateFrom)) {  // Check if it's a valid date
          hour.dateFrom = format(parsedDateFrom, "dd-MM-yyyy'T'HH:mm");
        }
      }

      if (hour.dateTo) {
        const parsedDateTo = parseISO(hour.dateTo);
        if (!isNaN(parsedDateTo)) {
          hour.dateTo = format(parsedDateTo, "dd-MM-yyyy'T'HH:mm");
        }
      }
    });
    dispatch({
      type: "SET_HOURS",
      payload: {
        hours: formatHours,
      },
    });
  };


  const getHoursFiltered = async (page, params) => {
    const getHoursPagination = await reqAxios(
      "get",
      `/hour/get/getHours/${page}`,
      params,
      ""
    );

    const formatHours = getHoursPagination.data.response.map(hour => {
      // Create a new object to avoid mutating the original directly
      const formattedHour = { ...hour };

      // Ensure dates are valid before formatting
      if (hour.dateFrom) {
        const parsedDateFrom = parseISO(hour.dateFrom);
        if (!isNaN(parsedDateFrom)) {
          formattedHour.dateFrom = format(parsedDateFrom, "dd-MM-yyyy'T'HH:mm");
        }
      }

      if (hour.dateTo) {
        const parsedDateTo = parseISO(hour.dateTo);
        if (!isNaN(parsedDateTo)) {
          formattedHour.dateTo = format(parsedDateTo, "dd-MM-yyyy'T'HH:mm");
        }
      }
      //console.log(moment.utc(hour.dateTo).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss"));
      // Return the modified object for the new array
      return formattedHour;
    });
    dispatch({
      type: "SET_HOUR_FILTERED",
      payload: {
        hoursFiltered: formatHours,
        totalHoursPages: getHoursPagination.data.pages,
      },
    });
  };

  const getHoursFilteredAdmin = async (page, params) => {
    const getHoursPagination = await reqAxios(
      "get",
      `/hour/get/getHoursAdmin/${page}`,
      params,
      ""
    );


    //moment.utc(hour.dateTo).tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD HH:mm:ss"));
    const formatHours = getHoursPagination.data.response.map(hour => {
      // Create a new object to avoid mutating the original directly
      const formattedHour = { ...hour };

      // Ensure dates are valid before formatting
      if (hour.dateFrom) {
        formattedHour.dateFrom = moment.utc(hour.dateFrom).tz("America/Argentina/Buenos_Aires").format("DD-MM-YYYY HH:mm:ss");
      }

      if (hour.dateTo) {
        formattedHour.dateTo = moment.utc(hour.dateTo).tz("America/Argentina/Buenos_Aires").format("DD-MM-YYYY HH:mm:ss");
      }

      // Return the modified object for the new array
      return formattedHour;
    });
    dispatch({
      type: "SET_HOUR_FILTERED_ADMIN",
      payload: {
        hoursFiltered: formatHours,
        totalHoursPages: getHoursPagination.data.pages,
      },
    });
  };

  const editHour = async (hourRegister) => {
    await reqAxios(
      "PUT",
      `/hour/edit/${hourRegister.id}`,
      "",
      hourRegister
    );
    dispatch({
      type: "CLEAN_HOUR_DATA",
      payload: {
        hourData: {
          id: "",
          dateFrom: "",
          dateTo: "",
          institutionId: "",
          universityId: "",
          carrerId: "",
        }
      }
    });
  };

  return (
    <HourContext.Provider
      value={{
        hourState: state,
        getAllHours,
        createNewHour,
        editHour,
        getHourData,
        getHourDataEdit,
        getHoursFiltered,
        getHoursFilteredAdmin,
      }}
    >
      {children}
    </HourContext.Provider>
  );
};
