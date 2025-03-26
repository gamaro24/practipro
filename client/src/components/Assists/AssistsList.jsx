import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToolTip } from "../ToolTip/ToolTip";
import { getDataUserByKey } from "../../helpers/helpers";
import { format, parseISO } from "date-fns";



export const AssistsList = ({
  assist,
  showAlertSign,
  setAssistToSign,
}) => {

  const roleId = getDataUserByKey("roleId");

  const signAssist = () => {
    showAlertSign(true);
    setAssistToSign({
      id: assist.id,
      roleId: roleId,
      entityName: assist.name,
      entityType: "assist",
      navigate: "/assists",
    });
  };

  return (
    <>
      <tr>
        <td>{`${assist.user.name} ${assist.user.lastname}`}</td>
        <td>{assist.hour.institution.name}</td>
        <td>
          {assist?.hour?.dateFrom}
        </td>
        <td>
          {(assist?.hour?.dateTo)}
        </td>

        <td>{assist.signProfessor ? "Firmado" :

          roleId === 2 ?

            <ToolTip tooltip={true} text={"Firmar"}>
              <i
                type="button"
                className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
                onClick={signAssist}
              ></i>
            </ToolTip>
            :
            "Pendiente"
        }
        </td>


        <td>{assist.signSupervisor ? "Firmado" :

          roleId === 4 ?

            <ToolTip tooltip={true} text={"Firmar"}>
              <i
                type="button"
                className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
                onClick={signAssist}
              ></i>
            </ToolTip>
            :
            "Pendiente"
        }
        </td>
      </tr>
    </>
  );
};
