import { GET_HOUR_DATA, SET_HOURS, CLEAN_HOUR_DATA, SET_HOUR_FILTERED, GET_HOUR_DATA_EDIT } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_HOUR_DATA:
      return {
        ...state,
        hourData: payload,
      };
      case GET_HOUR_DATA_EDIT:
        return {
          ...state,
          hourData: payload,
        };
    case SET_HOURS:
      return {
        ...state,
        hours: payload.hours
      };
    case CLEAN_HOUR_DATA:
      return {
        ...state,
        hourData: payload,
      };
    case SET_HOUR_FILTERED:
      return {
        ...state,
        hoursFiltered: payload.hoursFiltered,
        totalHoursPages: payload.totalHoursPages,
      };

    default:
      return state;
  }

};