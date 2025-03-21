import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToolTip } from "../ToolTip/ToolTip";
import { getDataUserByKey } from "../../helpers/helpers";
import { format, parseISO } from "date-fns";


export const CyclesList = ({
  cycle,
}) => {

  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{`${cycle.user.name} ${cycle.user.lastname}`}</td>
        <td>{`${cycle.numberCycle}`}</td>
        <td>{`${cycle.institution.name}`}</td>
        <td>{`${cycle.carrer.name}`}</td>
        <td className="">
          <ToolTip tooltip={true} text={"Ver Evaluaciones"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
              onClick={() => navigate(`/evaluations/${cycle.id}`)}
            ></i>
          </ToolTip>
        </td>
      </tr>
    </>
  );
};
