import { SET_EVALUATION_FILTERED, GET_EVALUATION_DATA, CLEAN_EVALUATION_DATA } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_EVALUATION_DATA:
      return {
        ...state,
        evaluationData: payload,
      };
    case SET_EVALUATION_FILTERED:
      return {
        ...state,
        evaluationsFiltered: payload.evaluationsFiltered,
        totalEvaluationsPages: payload.totalEvaluationsPages,
      };
    case CLEAN_EVALUATION_DATA:
      return {
        ...state,
        evaluationData: payload.evaluationData,
      };

    default:
      return state;
  }

};