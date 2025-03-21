import { GET_USER_DATA, SET_EVALUATORS, SET_USERS, SET_USERS_FILTERED, CLEAN_USER_DATA } from "./types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    case SET_USERS:
      return {
        ...state,
        users: payload.users,
        totalUsersPages: payload.totalUsersPages,
        usersSelector: payload.userSelector,
        authorSelector: payload.authorSelector,
      };
    case SET_EVALUATORS:
      return {
        ...state,
        evaluators: payload.evaluators,
        evaluatorsSelector: payload.evaluatorsSelector,
      };
    case SET_USERS_FILTERED:
      return {
        ...state,
        usersFiltered: payload.usersFiltered,
        totalUsersPages: payload.totalUsersPages,
      };

      case CLEAN_USER_DATA:
        return {
          ...state,
          userData: payload.userData,
        };
    default:
      return state;
  }
};