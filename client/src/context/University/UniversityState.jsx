import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { UniversityContext } from "./UniversityContext";
import UniversityReducer from "./UniversityReducer";
import { alertSuccess } from "../../helpers/alerts";


export const UniversityState = ({ children }) => {
  const initialState = {
    universityData: {
      id: "",
      name: "",
      address: "",
    },
    universities: [],
    universitiesFiltered: [],
    totalUniversitiesPages: 0,
    evaluators: [],
    evaluatorsSelector: [],
  };
  const [state, dispatch] = useReducer(UniversityReducer, initialState);


  const createNewUniversity = async (university) => {
    try {
      const data = await reqAxios("POST", `/universities/create`, "", university);
      alertSuccess(data.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const getUniversityData = async (id) => {
    const dataUniversity = await reqAxios("GET", `/universities/get/${id}`, "", "");
    dispatch({
      type: "GET_UNIVERSITY_DATA",
      payload: dataUniversity.data.university,
    });
  };

  const getAllUniversities = async () => {
    const getAllUniversity = await reqAxios("GET", "/universities/getall", "", "");

    dispatch({
      type: "SET_UNIVERSITIES",
      payload: {
        universities: getAllUniversity.data.universities,
      },
    });
  };


  const getUniversitiesFiltered = async (page, params) => {
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

    const getUniversitiesPagination = await reqAxios(
      "get",
      `/universities/get/universities/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_UNIVERSITIES_FILTERED",
      payload: {
        universitiesFiltered: getUniversitiesPagination.data.response,
        totalUniversitiesPages: getUniversitiesPagination.data.pages,
      },
    });
  };



  const editUniversity = async (universityRegister) => {
    await reqAxios(
      "PUT",
      `/universities/edit/${universityRegister.id}`,
      "",
      universityRegister
    );
    dispatch({
      type: "CLEAN_UNIVERSITY_DATA",
      payload: {
        universityData: {
          name: "",
          address: "",
        }
      }
    });
  };

  return (
    <UniversityContext.Provider
      value={{
        universityState: state,
        getAllUniversities,
        createNewUniversity,
        editUniversity,
        getUniversityData,
        getUniversitiesFiltered,
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};
