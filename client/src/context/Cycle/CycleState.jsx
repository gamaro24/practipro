import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { CycleContext } from "./CycleContext";
import CycleReducer from "./CycleReducer";
import { alertSuccess } from "../../helpers/alerts";
import { format, parseISO } from "date-fns";

export const CycleState = ({ children }) => {
  const initialState = {
    cycleData: {
      id: "",
      userId: "",
      carrerId: "",
      institutionId: "",
      observations: "",
    },
    cycles: [],
    cyclesFiltered: [],
    totalCyclesPages: 0,
  };
  const [state, dispatch] = useReducer(CycleReducer, initialState);

  const getCyclesFiltered = async (page, params) => {
    const getCyclesPagination = await reqAxios(
      "get",
      `/cycle/get/getCycles/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_CYCLE_FILTERED",
      payload: {
        cyclesFiltered: getCyclesPagination.data.response,
        totalCyclesPages: getCyclesPagination.data.pages,
      },
    });
  };

  return (
    <CycleContext.Provider
      value={{
        cycleState: state,
        getCyclesFiltered,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
