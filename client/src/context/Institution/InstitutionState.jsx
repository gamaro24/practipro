import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { InstitutionContext } from "./InstitutionContext";
import InstitutionReducer from "./InstitutionReducer";
import { alertSuccess } from "../../helpers/alerts";


export const InstitutionState = ({ children }) => {
  const initialState = {
    institutionData: {
      id: "",
      name: "",
      address: "",
      description: "",
    },
    institutions: [],
    institutionsFiltered: [],
    totalInstitutionsPages: 0,
    evaluatorsChino: [],
    evaluatorsSelector: [],
  };
  const [state, dispatch] = useReducer(InstitutionReducer, initialState);


  const createNewInstitution = async (institution) => {
    try {
      const data = await reqAxios("POST", `/institution/create`, "", institution);
      alertSuccess(data.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const getInstitutionData = async (id) => {
    const dataInstitution = await reqAxios("GET", `/institution/get/${id}`, "", "");
    dispatch({
      type: "GET_INSTITUTION_DATA",
      payload: dataInstitution.data.institution,
    });
  };

  const getAllInstitutions = async () => {
    const getAllInstitution = await reqAxios("GET", "/institution/getall", "", "");

    dispatch({
      type: "SET_INSTITUTIONS",
      payload: {
        institutions: getAllInstitution.data.institutions,
      },
    });
  };


  const getInstitutionsFiltered = async (page, params) => {
    /*     const userFounded = state.usersFiltered.find(
          (user) => user.id === params.id
        );
    
        if (userFounded) {
          return dispatch({
            type: "SET_USERS_FILTERED",
            payload: {
              usersFiltered: [userFounded],
              totalUsersPages: 1,
            },
          });
        } */

    const getInstitutionsPagination = await reqAxios(
      "get",
      `/institution/get/institutions/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_INSTITUTION_FILTERED",
      payload: {
        institutionsFiltered: getInstitutionsPagination.data.response,
        totalInstitutionsPages: getInstitutionsPagination.data.pages,
      },
    });
  };



  const editInstitution = async (institutionRegister) => {
    await reqAxios(
      "PUT",
      `/institution/edit/${institutionRegister.id}`,
      "",
      institutionRegister
    );
    dispatch({
      type: "CLEAN_INSTITUTION_DATA",
      payload: {
        institutionData: {
          name: "",
          address: "",
          description: "",
        }
      }
    });
  };

  return (
    <InstitutionContext.Provider
      value={{
        institutionState: state,
        getAllInstitutions,
        createNewInstitution,
        editInstitution,
        getInstitutionData,
        getInstitutionsFiltered,
      }}
    >
      {children}
    </InstitutionContext.Provider>
  );
};
