import { GET_CARRER_DATA, SET_CARRERS, CLEAN_CARRER_DATA, SET_CARRERS_FILTERED } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_CARRER_DATA:
      return {
        ...state,
        carrerData: payload,
      };
    case SET_CARRERS:
      return {
        ...state,
        carrers: payload.carrers
      };
    case CLEAN_CARRER_DATA:
      return {
        ...state,
        carrerData: payload,
      };
    case SET_CARRERS_FILTERED:
      return {
        ...state,
        carrersFiltered: payload.carrersFiltered,
        totalCarrersPages: payload.totalCarrersPages,
      };

    default:
      return state;
  }

};