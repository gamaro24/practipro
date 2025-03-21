import { useReducer } from "react";
import { reqAxios } from "../../helpers/helpers";
import { NotebookContext } from "./NotebookContext";
import NotebookReducer from "./NotebookReducer";

export const NotebookState = ({ children }) => {
  const initialState = {
    notebookData: {
      userId: "",
      institutionId: "",
      carrerId: "",
    },
    notebook: [],
  };
  const [state, dispatch] = useReducer(NotebookReducer, initialState);

  const getNotebook = async (params) => {
    const getNotebookData = await reqAxios(
      "get",
      `/cycle/get/getNotebook/`,
      params,
      ""
    );
    dispatch({
      type: "GET_NOTEBOOK",
      payload: {
        notebook: getNotebookData.data.response,
      },
    });
  };

  return (
    <NotebookContext.Provider
      value={{
        notebookState: state,
        getNotebook,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
};
