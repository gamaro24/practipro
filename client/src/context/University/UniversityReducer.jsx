import { GET_UNIVERSITY_DATA, SET_UNIVERSITIES, CLEAN_UNIVERSITY_DATA, SET_UNIVERSITIES_FILTERED } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_UNIVERSITY_DATA:
      return {
        ...state,
        universityData: payload,
      };
    case SET_UNIVERSITIES:
      return {
        ...state,
        universities: payload.universities
      };
    case CLEAN_UNIVERSITY_DATA:
      return {
        ...state,
        universityData: payload,
      };
    case SET_UNIVERSITIES_FILTERED:
      return {
        ...state,
        universitiesFiltered: payload.universitiesFiltered,
        totalUniversitiesPages: payload.totalUniversitiesPages,
      };

    default:
      return state;
  }

};