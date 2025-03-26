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


  const getAssistsFiltered = async (page, params) => {
    const getAssistsPagination = await reqAxios(
      "get",
      `/assist/get/getAssist/${page}`,
      params,
      ""

    );

    const formatHours = getAssistsPagination.data.response.map(hour => {

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
      type: "SET_ASSIST_FILTERED",
      payload: {
        assistsFiltered: formatHours,
        totalAssistsPages: getAssistsPagination.data.pages,
      },
    });
  };


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
