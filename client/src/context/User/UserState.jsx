import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { UserContext } from "./UserContext";
import UserReducer from "./UserReducer";

export const UserState = ({ children }) => {
  const initialState = {
    userData: {
      username: "",
      roleId: "",
      name: "",
      lastname: "",
      email: "",
      universityId: "",
      carrerId: "",
      dni: "",
      address: "",
      realaddress: "",
      cellphone: "",
      password: "",
      confirmPassword: "",
    },
    users: [],
    usersFiltered: [],
    totalUsersPages: 0,
    usersSelector: [],
    authorSelector: [],
    evaluators: [],
    evaluatorsSelector: [],
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUserData = async (id) => {
    const dataUser = await reqAxios("GET", `/user/get/${id}`, "", "");
    //agrego confirmPassword al objeto porque sino despues al no existir no puede hacer la validacion en el .strim()
    dataUser.data.user.confirmPassword = dataUser.data.user.password;
    dispatch({
      type: "GET_USER_DATA",
      payload: dataUser.data.user,
    });
  };

  const getAllUsers = async () => {
    const getAllUser = await reqAxios("GET", "/user/getall", "", "");

    const userSelector = getAllUser.data.response.map((item, i) => {
      return {
        label: item.id + " - " + item.name + " " + item.lastname,
        value: item.id,
        target: { name: "id", value: item.id },
      };
    });

    const authorSelector = getAllUser.data.response.map((item, i) => {
      return {
        label: item.roleId + " - " + item.name + " " + item.lastname,
        value: item.id,
        target: { name: "authorId", value: item.id },
      };
    });

    dispatch({
      type: "SET_USERS",
      payload: {
        users: getAllUser.data.response,
        totalUsersPages: getAllUser.data.pages,
        userSelector: userSelector,
        authorSelector:authorSelector
      },
    });
  };

  const getUsersFiltered = async (page, params) => {
    const getUsers = await reqAxios(
      "get",
      `/user/get/users/${page}`,
      params,
      ""
    );
    dispatch({
      type: "SET_USERS_FILTERED",
      payload: {
        usersFiltered: getUsers.data.response,
        totalUsersPages: getUsers.data.pages,
      },
    });
  };

    const editUser = async (userRegister) => {
       await reqAxios(
        "PUT",
        `/user/edit/${userRegister.id}`,
        "",
        userRegister
      );
      dispatch({
        type: "CLEAN_USER_DATA",
        payload: {
          userData: {
            username: "",
            roleId: "",
            name: "",
            lastname: "",
            email: "",
            universityId: "",
            carrerId: "",
            dni: "",
            address: "",
            realaddress: "",
            cellphone: "",
            password: "",
            confirmPassword: "",
        }}
      });
    };

  const getAllEvaluators = async () => {
    try {
      const allEvaluators = await reqAxios(
        "GET",
        "/user/getallevaluators",
        "",
        ""
      );
      const EvaluatorSelector = allEvaluators.data.response.map((item) => {
        return {
          label: item.name + " " + item.surname,
          value: item.id,
          target: { name: "evaluatorId", value: item.id },
        };
      });

      dispatch({
        type: "SET_EVALUATORS",
        payload: {
          evaluators: allEvaluators.data.response,
          evaluatorsSelector: EvaluatorSelector,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userState: state,
        getUserData,
        getAllUsers,
        getUsersFiltered,
        editUser,
        getAllEvaluators,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
