import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { CarrerContext } from "./CarrerContext";
import CarrerReducer from "./CarrerReducer";
import { alertSuccess } from "../../helpers/alerts";


export const CarrerState = ({ children }) => {
  const initialState = {
    carrerData: {
      id: "",
      name: "",
      university: "",
      code: "",
      description: "",
    },
    carrers: [],
    carrersFiltered: [],
    totalCarrersPages: 0,
    evaluators: [],
    evaluatorsSelector: [],
  };
  const [state, dispatch] = useReducer(CarrerReducer, initialState);


  const createNewCarrer = async (carrer) => {
    try {
      const data = await reqAxios("POST", `/carrer/create`, "", carrer);
      alertSuccess(data.data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const getCarrerData = async (id) => {
    const dataCarrer = await reqAxios("GET", `/carrer/get/${id}`, "", "");
    dispatch({
      type: "GET_CARRER_DATA",
      payload: dataCarrer.data.carrer,
    });
  };

  const getAllCarrers = async () => {
    const getAllCarrer = await reqAxios("GET", "/carrer/getall", "", "");

    dispatch({
      type: "SET_CARRERS",
      payload: {
        carrers: getAllCarrer.data.carrers,
      },
    });
  };


  const getCarrersFiltered = async (page, params) => {
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

    const getCarrersPagination = await reqAxios(
      "get",
      `/carrer/get/carrers/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_CARRERS_FILTERED",
      payload: {
        carrersFiltered: getCarrersPagination.data.response,
        totalCarrersPages: getCarrersPagination.data.pages,
      },
    });
  };



  const editCarrer = async (carrerRegister) => {
    await reqAxios(
      "PUT",
      `/carrer/edit/${carrerRegister.id}`,
      "",
      carrerRegister
    );
    dispatch({
      type: "CLEAN_CARRER_DATA",
      payload: {
        carrerData: {
          universityId: "",
          name: "",
          code: "",
          description: "",
        }
      }
    });
  };

  return (
    <CarrerContext.Provider
      value={{
        carrerState: state,
        getAllCarrers,
        createNewCarrer,
        editCarrer,
        getCarrerData,
        getCarrersFiltered,
      }}
    >
      {children}
    </CarrerContext.Provider>
  );
};
