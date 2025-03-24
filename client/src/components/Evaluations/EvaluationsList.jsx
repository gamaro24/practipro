import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToolTip } from "../ToolTip/ToolTip";
import { getDataUserByKey } from "../../helpers/helpers";
import { format, parseISO } from "date-fns";


export const EvaluationsList = ({
  evaluation,
}) => {

  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{`${evaluation?.cycle.user.name} ${evaluation?.cycle.user.lastname}`}</td>
        <td>{`${evaluation?.criteria}`}</td>
        <td>{evaluation?.note ?? "Pendiente"}</td>
        <td className="">
          <ToolTip tooltip={true} text={"Editar"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/evaluations/edit/${evaluation.id}`)}
            ></i>
          </ToolTip>
        </td>
      </tr>
    </>
  );
};
