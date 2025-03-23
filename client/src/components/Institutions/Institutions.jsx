import React, { useState, useContext, useEffect } from 'react';
import "./institutions.css";
import { InstitutionContext } from "../../context/Institution/InstitutionContext";
import { InstitutionsList } from './InstitutionsList';
import { useNavigate } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import ModalQr from "../Modals/ModalQr";
import { PaginationCustom } from "../Pagination/Pagination";
import { getDataUserByKey } from "../../helpers/helpers";
import { QRCodeCanvas } from "qrcode.react";


const Institutions = () => {

  const isAdmin = getDataUserByKey("roleId") === 1;

  const initialFilters = {

    id: "",
    name: "",
  };

  const navigate = useNavigate();

  const { createNewInstitution, institutionState, getAllInstitutions, getInstitutionsFiltered } = useContext(InstitutionContext);
  const { institutions, totalInstitutionsPages, institutionsFiltered } = institutionState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carrerToDelete, setCarrerToDelete] = useState(false);

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [qrValue, setQrValue] = useState("");
  const [showModalQr, setShowModalQr] = useState(false);

  const [institution, setinstitution] = useState({
    name: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    if (institutions?.length === 0) {
      getAllInstitutions();
    }
    getInstitutionsFiltered(page, filters);
  }, [page]);

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={carrerToDelete} showAlert={setShowDeleteModal} />
      ) : null}

      {showModalQr && (
        <ModalQr onClose={() => setShowModalQr(false)}>
          <div className = 'd-flex justify-content-center align-items-center'>
          <QRCodeCanvas value={qrValue} size={256} />
          </div>
        </ModalQr>
      )}
      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Institutos</h2>
        {
          institutionsFiltered?.length > 0 ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Dirección</th>
                      <th>Descripcion</th>
                      <th>Ver horas</th>
                      <th>QR</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {institutionsFiltered.map((institution) => (
                      <InstitutionsList
                        institution={institution}
                        key={institution.id}
                        showAlert={setShowDeleteModal}
                        setCarrerToDelete={setCarrerToDelete}
                        isAdmin={isAdmin}
                        setQrValue={setQrValue}
                        setShowModalQr={setShowModalQr}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-2">

                {isAdmin && (
                  <button className="w-100 btn btn-lg btn-primary"
                    onClick={() => navigate("/institution/create/")}>
                    Agregar Instituto</button>
                )}
              </div>

              <PaginationCustom
                currentPage={page}
                totalPages={totalInstitutionsPages}
                paginate={setPage}
              />
            </>
          ) : (
            <p className="text-center">No hay registros</p>
          )}
      </div>
    </>
  );

};

export default Institutions;