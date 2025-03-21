import { SET_CYCLE_FILTERED } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_CYCLE_FILTERED:
      return {
        ...state,
        cyclesFiltered: payload.cyclesFiltered,
        totalCyclesPages: payload.totalCyclesPages,
      };

    default:
      return state;
  }

};