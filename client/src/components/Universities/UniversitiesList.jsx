import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToolTip } from "../ToolTip/ToolTip";
import { alertError } from "../../helpers/alerts";

export const UniversitiesList = ({
  university,
  setUniversityToDelete,
  showAlert
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const deleteUniversity = () => {
    showAlert(true);
    setUniversityToDelete({
      id: university.id,
      entityName: university.name,
      entityType: "universities",
      navigate: pathname,
    });
  };

  return (
    <>
      <tr>
        <td>{university.name}</td>
        <td>{university.address}</td>
        <td className="">
          <ToolTip tooltip={true} text={"Editar Universidad"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/university/edit/${university.id}`)}
            ></i>
          </ToolTip>
        </td>

        <td>
          <ToolTip tooltip={true} text={"Eliminar Universidad"}>
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteUniversity}
            ></i>
          </ToolTip>
        </td>
      </tr>
    </>
  );
};
