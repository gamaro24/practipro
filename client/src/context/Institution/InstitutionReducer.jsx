import { GET_INSTITUTION_DATA, SET_INSTITUTIONS, CLEAN_INSTITUTION_DATA, SET_INSTITUTION_FILTERED } from "./types.js";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_INSTITUTION_DATA:
      return {
        ...state,
        institutionData: payload,
      };
    case SET_INSTITUTIONS:
      return {
        ...state,
        institutions: payload.institutions
      };
    case CLEAN_INSTITUTION_DATA:
      return {
        ...state,
        institutionData: payload,
      };
    case SET_INSTITUTION_FILTERED:
      return {
        ...state,
        institutionsFiltered: payload.institutionsFiltered,
        totalInstitutionsPages: payload.totalInstitutionsPages,
      };

    default:
      return state;
  }

};