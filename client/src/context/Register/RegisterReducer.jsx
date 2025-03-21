import { GET_ALL_ROLES } from "./types";
import { GET_ALL_UNIVERSITIES } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_ALL_ROLES:
      return {
        ...state,
        roles: payload.roles,
        rolesSelector: payload.rolesSelector
      };
    case GET_ALL_UNIVERSITIES:
      return {
        ...state,
        universities: payload
      };

    default:
      return state;
  }
};
