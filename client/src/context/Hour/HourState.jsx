import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { HourContext } from "./HourContext";
import HourReducer from "./HourReducer";
import { alertSuccess } from "../../helpers/alerts";
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
      dataHour.data.hour.dateFrom = moment.utc(dataHour.data.hour.dateFrom).format("DD-MM-YYYY HH:mm:ss");
    }

    if (dataHour.data.hour.dateTo) {
      dataHour.data.hour.dateTo = moment.utc(dataHour.data.hour.dateTo).format("DD-MM-YYYY HH:mm:ss");
    }
    dispatch({
      type: "GET_HOUR_DATA",
      payload: dataHour.data.hour,
    });
  };

  const getHourDataEdit = async (id) => {
    const dataHour = await reqAxios("GET", `/hour/get/${id}`, "", "");

    if (dataHour.data.hour.dateFrom) {
      dataHour.data.hour.dateFrom = moment.utc(dataHour.data.hour.dateFrom).format("YYYY-MM-DD HH:mm:ss");
    }

    if (dataHour.data.hour.dateTo) {
      dataHour.data.hour.dateTo = moment.utc(dataHour.data.hour.dateTo).format("YYYY-MM-DD HH:mm:ss");
    }
    dispatch({
      type: "GET_HOUR_DATA_EDIT",
      payload: dataHour.data.hour,
    });
  };


  const getAllHours = async () => {
    const getAllHour = await reqAxios("GET", "/hour/getall", "", "");

    const formatHours = getAllHour.data.hours.map(hour => {

      if (hour.dateFrom) {
        hour.dateFrom = moment.utc(hour.dateFrom).format("DD-MM-YYYY HH:mm:ss");
      }

      if (hour.dateTo) {
        hour.dateTo = moment.utc(hour.dateTo).format("DD-MM-YYYY HH:mm:ss");
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

      const formattedHour = { ...hour };


      if (hour.dateFrom) {
        formattedHour.dateFrom = moment.utc(hour.dateFrom).format("DD-MM-YYYY HH:mm:ss");
      }

      if (hour.dateTo) {
        formattedHour.dateTo = moment.utc(hour.dateTo).format("DD-MM-YYYY HH:mm:ss");
      }

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

    const formatHours = getHoursPagination.data.response.map(hour => {

      const formattedHour = { ...hour };

      if (hour.dateFrom) {
        formattedHour.dateFrom = moment.utc(hour.dateFrom).format("DD-MM-YYYY HH:mm:ss");
      }

      if (hour.dateTo) {
        formattedHour.dateTo = moment.utc(hour.dateTo).format("DD-MM-YYYY HH:mm:ss");
      }

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
