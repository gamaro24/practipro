import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToolTip } from "../ToolTip/ToolTip";


export const InstitutionsList = ({ institution, setInstitutionToDelete, showAlert, isAdmin, setQrValue, setShowModalQr }) => {
  const navigate = useNavigate();

  const generateQRCode = () => {
    const qrUrl = `${import.meta.env.VITE_APP_URL}/qr/${institution.id}`;
    setQrValue(qrUrl);
    setShowModalQr(true);
  };

  
  const deleteInstitution = () => {
    showAlert(true);
    setInstitutionToDelete({
      id: institution.id,
      entityName: institution.name,
      entityType: "institution",
      navigate: window.location.pathname,
    });
  };

  return (
    <>
      <tr>
        <td>{institution.name}</td>
        <td>{institution.address}</td>
        <td>{institution.description}</td>

        <td className="">
          <ToolTip tooltip={true} text={"Ver horas"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-list icon-size-table btn-edit-table"
              onClick={() => navigate(`/hours/${institution.id}`)}
            ></i>
          </ToolTip>
        </td>

        <td className="">
          <ToolTip tooltip={true} text={"Ver QR"}>
            <i
              type="button"
              className="color-icon-edit fa-solid fa-eye icon-size-table btn-edit-table"
              onClick={generateQRCode} // Generate QR on click
            ></i>
          </ToolTip>
        </td>

        {isAdmin && (
          <>
            <td className="">
              <ToolTip tooltip={true} text={"Editar Instituto"}>
                <i
                  type="button"
                  className="color-icon-edit fa-solid fa-pen-to-square icon-size-table btn-edit-table"
                  onClick={() => navigate(`/institution/edit/${institution.id}`)}
                ></i>
              </ToolTip>
            </td>

            <td>
              <ToolTip tooltip={true} text={"Eliminar Instituto"}>
                <i
                  type="button"
                  className="fa-solid fa-trash-can color-icon-error icon-size-table btn-delete-table"
                  onClick={deleteInstitution}
                ></i>
              </ToolTip>
            </td>
          </>
        )}
      </tr>
    </>
  );
};
