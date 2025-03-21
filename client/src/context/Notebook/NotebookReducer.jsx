import { GET_NOTEBOOK } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_NOTEBOOK:
      return {
        ...state,
        notebook: payload.notebook,
      };

    default:
      return state;
  }

};