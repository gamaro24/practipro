import { SET_ASSIST_FILTERED } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_ASSIST_FILTERED:
      return {
        ...state,
        assistsFiltered: payload.assistsFiltered,
        totalAssistsPages: payload.totalAssistsPages,
      };

    default:
      return state;
  }

};