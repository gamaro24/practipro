import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToolTip } from "../ToolTip/ToolTip";
import { alertError } from "../../helpers/alerts";

export const CarrersList = ({
  carrer,
  setCarrerToDelete,
  showAlert
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const deleteCarrer = () => {
    showAlert(true);
    setCarrerToDelete({
      id: carrer.id,
      entityName: carrer.name,
      entityType: "carrer",
      navigate: pathname,
    });
  };

  return (
    <>
      <tr>
        <td>{carrer.university.name}</td>
        <td>{carrer.name}</td>
        <td>{carrer.code}</td>
        <td>{carrer.description}</td>
        <td className="">
          <ToolTip tooltip={true} text={"Editar Carrera"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/carrer/edit/${carrer.id}`)}
            ></i>
          </ToolTip>
        </td>

        <td>
          <ToolTip tooltip={true} text={"Eliminar Carrera"}>
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteCarrer}
            ></i>
          </ToolTip>
        </td>
      </tr>
    </>
  );
};
