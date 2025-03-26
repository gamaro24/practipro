import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { AssistContext } from "./AssistContext";
import AssistReducer from "./AssistReducer";
import moment from "moment";

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
    console.log("getAssistsPagination", getAssistsPagination.data.response);

    const formatHours = getAssistsPagination.data.response.map(assist => {

      const formattedHour = { ...assist };

      if (assist.hour.dateFrom) {
        formattedHour.hour.dateFrom = moment.utc(assist.hour.dateFrom).format("DD-MM-YYYY HH:mm:ss");
      }

      if (assist.hour.dateTo) {
        formattedHour.hour.dateTo = moment.utc(assist.hour.dateTo).format("DD-MM-YYYY HH:mm:ss");
      }

      return formattedHour;
    });
    console.log(formatHours);
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
