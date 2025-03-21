import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { AssistContext } from "./AssistContext";
import AssistReducer from "./AssistReducer";
import { alertSuccess } from "../../helpers/alerts";
import { format, parseISO } from "date-fns";

export const AssistState = ({ children }) => {
  const initialState = {
    assistData: {
      id: "",
      userId: "",
      observations: "",
    },
    assists: [],
    assistsFiltered: [],
    totalAssistsPages: 0,
    evaluatorsChino: [],
    evaluatorsSelector: [],
  };
  const [state, dispatch] = useReducer(AssistReducer, initialState);


/*   const createNewHour = async (hour) => {
    try {
      const data = await reqAxios("POST", `/hour/create`, "", hour);
      alertSuccess(data.data.msg);
    } catch (e) {
      console.log(e);
    }
  }; */

/*   const getHourData = async (id) => {
    const dataHour = await reqAxios("GET", `/hour/get/${id}`, "", "");

    if (dataHour.data.hour.dateFrom) {
      const parsedDateFrom = parseISO(dataHour.data.hour.dateFrom);  // Parse ISO string safely
      if (!isNaN(parsedDateFrom)) {  // Check if it's a valid date
        dataHour.data.hour.dateFrom = format(parsedDateFrom, "yyyy-MM-dd'T'HH:mm");
      }
    }

    if (dataHour.data.hour.dateTo) {
      const parsedDateTo = parseISO(dataHour.data.hour.dateTo);
      if (!isNaN(parsedDateTo)) {
        dataHour.data.hour.dateTo = format(parsedDateTo, "yyyy-MM-dd'T'HH:mm");
      }
    }

    dispatch({
      type: "GET_HOUR_DATA",
      payload: dataHour.data.hour,
    });
  };
 */
/*   const getAllHours = async () => {
    const getAllHour = await reqAxios("GET", "/hour/getall", "", "");

    const formatHours = getAllHour.data.hours.map(hour => {

      // Ensure dates are valid before formatting
      if (hour.dateFrom) {
        const parsedDateFrom = parseISO(hour.dateFrom);  // Parse ISO string safely
        if (!isNaN(parsedDateFrom)) {  // Check if it's a valid date
          hour.dateFrom = format(parsedDateFrom, "yyyy-MM-dd'T'HH:mm");
        }
      }

      if (hour.dateTo) {
        const parsedDateTo = parseISO(hour.dateTo);
        if (!isNaN(parsedDateTo)) {
          hour.dateTo = format(parsedDateTo, "yyyy-MM-dd'T'HH:mm");
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
 */

  const getAssistsFiltered = async (page, params) => {
    const getAssistsPagination = await reqAxios(
      "get",
      `/assist/get/getAssist/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_ASSIST_FILTERED",
      payload: {
        assistsFiltered: getAssistsPagination.data.response,
        totalAssistsPages: getAssistsPagination.data.pages,
      },
    });
  };

/*   const editHour = async (hourRegister) => {
    await reqAxios(
      "PUT",
      `/hour/edit/${hourRegister.id}`,
      "",
      hourRegister
    );
    dispatch({
      type: "CLEAN_HOUR_DATA",
      payload: {
        assistData: {
          id: "",
          dateFrom: "",
          dateTo: "",
          institutionId: "",
          universityId: "",
          carrerId: "",
        }
      }
    });
  }; */

  return (
    <AssistContext.Provider
      value={{
        assistState: state,
/*         getAllHours,
        createNewHour,
        editHour,
        getHourData, */
        getAssistsFiltered,
      }}
    >
      {children}
    </AssistContext.Provider>
  );
};
