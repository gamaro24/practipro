import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { EvaluationContext } from "./EvaluationContext";
import EvaluationReducer from "./EvaluationReducer";

export const EvaluationState = ({ children }) => {
  const initialState = {
    evaluationData: {
      id: "",
      cycleId: "",
      criteria: "",
      note: "",
      observations: "",
    },
    evaluations: [],
    evaluationsFiltered: [],
    totalEvaluationsPages: 0,
  };
  const [state, dispatch] = useReducer(EvaluationReducer, initialState);

  const getEvaluationData = async (id) => {
    const dataEvaluation = await reqAxios("GET", `/evaluation/get/${id}`, "", "");
    dispatch({
      type: "GET_EVALUATION_DATA",
      payload: dataEvaluation.data.evaluation,
    });
  };

  const getEvaluationsFiltered = async (page, params) => {
    const getEvaluationsPagination = await reqAxios(
      "get",
      `/evaluation/get/getEvaluations/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_EVALUATION_FILTERED",
      payload: {
        evaluationsFiltered: getEvaluationsPagination.data.response,
        totalEvaluationsPages: getEvaluationsPagination.data.pages,
      },
    });
  };

  const editEvaluation = async (evaluationRegister) => {
    await reqAxios(
      "PUT",
      `/evaluation/edit/${evaluationRegister.id}`,
      "",
      evaluationRegister
    );
    dispatch({
      type: "CLEAN_EVALUATION_DATA",
      payload: {
        evaluationData: {
          criteria: "",
          note: "",
        }
      }
    });
  };

  return (
    <EvaluationContext.Provider
      value={{
        evaluationState: state,
        getEvaluationData,
        getEvaluationsFiltered,
        editEvaluation,
      }}
    >
      {children}
    </EvaluationContext.Provider>
  );
};
