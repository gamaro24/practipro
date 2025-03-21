import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ToolTip } from "../ToolTip/ToolTip";
import { getDataUserByKey } from "../../helpers/helpers";

export const UsersList = ({
  user,
  setUserToDelete,
  showAlert,
}) => {

  const isAdmin = getDataUserByKey("roleId") === 1;
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  //const { setUserIdToCertificate } = useContext(CertificateContext);

  /*  const startDate = user.startDate.split('-') */

  const deleteUser = () => {
    showAlert(true);
    setUserToDelete({
      id: user.id,
      entityName: user.name,
      entityType: "user",
      navigate: pathname,
    });
  };

  return (
    <>
      <tr>
        <td>{user?.name + " " + user?.lastname}</td>
        <td>{user?.dni}</td>
        <td>{user?.email}</td>

        {!isAdmin && (
            <td className="">
              <ToolTip tooltip={true} text={"Ver Rotaciones"}>
                <i
                  type="button"
                  className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
                  onClick={() => navigate(`/cycles/${user.id}`)}
                ></i>
              </ToolTip>
            </td>
        )}
        
        {isAdmin && (
          <>
            <td>{user?.role?.name}</td>
            <td className="">
              <ToolTip tooltip={true} text={"Editar usuario"}>
                <i
                  type="button"
                  className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
                  onClick={() => navigate(`/user/edit/${user.id}`)}
                ></i>
              </ToolTip>
            </td>

            <td>
              <ToolTip tooltip={true} text={"Eliminar usuario"}>
                <i
                  type="button"
                  className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
                  onClick={deleteUser}
                ></i>
              </ToolTip>
            </td>
          </>
        )}

      </tr>
    </>
  );
};
