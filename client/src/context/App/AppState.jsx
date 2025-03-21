import { useReducer } from "react";
import AppReducer from "./AppReducer";
import { AppContext } from "./AppContext";
import { reqAxios } from "../../helpers/helpers";
import { alertError, alertSuccess } from "../../helpers/alerts";

export const AppState = ({ children }) => {
  const initialState = {
    searchPixels: false,
    menuPhone: false,
    refreshRoleIdAndUserId: true,
    loggout: false,
    eventDate: null,
    deadlineDays: null,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setDeadlineDays = async (days) => {
    try {
      await reqAxios("PUT", `/date/edit/deadline/${days}`, "", "");
      dispatch({
        type: "SET_DEADLINE_DAY",
        payload: days,
      });
      alertSuccess("Fecha límite modificada correctamente.", 10000)
    } catch (error) {
      console.log(error)
      alertError("Error al modificar los dias límites previos al evento.", false)
    }
  };

  const handleTime = async (date) => {
    try {
      await reqAxios("PUT", `/date/edit/${date}`, "", "");
      dispatch({
        type: "SET_EVENT_DATE",
        payload: date,
      });
      alertSuccess("Fecha del evento modificada correctamente", 10000)
    } catch (error) {
      console.log(error)
      alertError("Error al modificar la fecha del evento.", false)
    }
  };

  const setSearchPixels = async (value) => {
    dispatch({
      type: "SET_SEARCH_PIXELS",
      payload: value,
    });
  };

  const setMenuPhone = async (value) => {
    dispatch({
      type: "SET_MENU_PHONE",
      payload: value,
    });
  };
  const setLoggout = async () => {
    dispatch({
      type: "SET_LOGGOUT",
      payload: !state.loggout,
    });
  };
  const setRefreshRoleIdAndUserId = (value) => {
    dispatch({
      type: "SET_REFRESH_ROLEID_USERID",
      payload: value,
    });
  };
  const getAppLogo = async () => {
    const AppLogo = await reqAxios(
      "GET",
      `/certificate/getcertificatelogo/appLogo`,
      "",
      ""
    );

    return AppLogo.data.response;
  };

  const getEventDate = async () => {

    try {
      const eventDate = await reqAxios(
        "GET",
        `/date/get`,
        "",
        ""
      );
      dispatch({
        type: "GET_EVENT_DATE",
        payload: eventDate.data.response,
      });
    } catch (error) {
      console.log(error)
      alertError("Error al obtener la fecha", false)
    }
  }

  return (
    <AppContext.Provider
      value={{
        appState: state,
        getAppLogo,
        getEventDate,
        handleTime,
        setDeadlineDays,
        setLoggout,
        setMenuPhone,
        setRefreshRoleIdAndUserId,
        setSearchPixels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

