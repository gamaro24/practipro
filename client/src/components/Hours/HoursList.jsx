import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToolTip } from "../ToolTip/ToolTip";
import { alertError } from "../../helpers/alerts";
import { getDataUserByKey } from "../../helpers/helpers";


export const HoursList = ({
  hour,
  setHourToDelete,
  setHourToRegistry,
  showAlert,
  showAlertRegistry
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const isAdmin = getDataUserByKey("roleId") === 1;
  const userId = getDataUserByKey("id");

  const deleteHour = () => {
    showAlert(true);
    setHourToDelete({
      id: hour.id,
      entityName: hour.name,
      entityType: "hour",
      navigate: pathname,
    });
  };

  const registerHour = () => {
    showAlertRegistry(true);
    setHourToRegistry({
      id: hour.id,
      userId: userId,
      entityName: hour.name,
      entityType: "assist",
      navigate: "/",
    });
  };

  return (
    <>
      <tr>
        {/* <td>{hour.dateFrom.replace("T", " - ").replace(":00.000Z", "")}</td> */}
        {/* <td>{hour.dateFrom.replace("T", " - ").replace(":00.000Z", "")}</td> */}
        <td>{hour.dateFrom.replace("T", " - ")}</td>
        <td>{hour.dateTo.replace("T", " - ")}</td>
        <td>{hour.university.name}</td>
        <td>{hour.carrer.name}</td>


        {!isAdmin && (
          <>
        <td className="">
          <ToolTip tooltip={true} text={"Registrarse Hora"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={registerHour}
            ></i>
          </ToolTip>
        </td>
        </>
        )}


        {isAdmin && (
          <>
        <td className="">
          <ToolTip tooltip={true} text={"Editar Hora"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/hour/edit/${hour.id}`)}
            ></i>
          </ToolTip>
        </td>

        <td>
          <ToolTip tooltip={true} text={"Eliminar Hora"}>
            <i
              type="button"
              className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
              onClick={deleteHour}
            ></i>
          </ToolTip>
        </td>

        </>
        )}
      </tr>
    </>
  );
};
