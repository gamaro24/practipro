import React, { useState, useContext, useEffect } from 'react';
import "./assist.css";
import { AssistContext } from "../../context/Assist/AssistContext";
import { AssistsList } from './AssistsList';
import { useNavigate, useParams } from "react-router-dom";
import ModalSign from "../Modals/ModalSign";
import { PaginationCustom } from "../Pagination/Pagination";
import { getDataUserByKey } from "../../helpers/helpers";


const Assists = () => {

  const initialFilters = {

    id: "",
    userId: getDataUserByKey("id"),
    roleId: getDataUserByKey("roleId"),
    universityId: getDataUserByKey("universityId"),
    carrerId: getDataUserByKey("carrerId")
  };

  const navigate = useNavigate();

  const { assistState, getAssistsFiltered } = useContext(AssistContext);
  const { assists, totalAssistsPages, assistsFiltered } = assistState;

  const [showSignModal, setShowSingModal] = useState(false);
  const [assistToSign, setAssistToSign] = useState(false);

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [assist, setAssist] = useState({
    userId: "",
    signProfessor: "",
    signSupervisor: "",
    observations: "",
  });

  useEffect(() => {
    getAssistsFiltered(page, filters);
  }, [page]);

  return (
    <>
      {showSignModal ? (
        <ModalSign entity={assistToSign} showAlertSign={setShowSingModal} />
      ) : null}
      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Asistencias</h2>
        {
          assistsFiltered?.length > 0 ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre Alumno</th>
                      <th>Instituto</th>
                      <th>Hora Entrada</th>
                      <th>Hora Salida</th>
                      <th>Firma docente</th>
                      <th>Firma referente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assistsFiltered.map((assist) => (
                      <AssistsList
                        assist={assist}
                        key={assist.id}
                        showAlertSign={setShowSingModal}
                        setAssistToSign={setAssistToSign}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-2"></div>

              <PaginationCustom
                currentPage={page}
                totalPages={totalAssistsPages}
                paginate={setPage}
              />
            </>
          ) : (
            <p className="text-center">No hay registros</p>
          )}


        <div className="p-2">

        {getDataUserByKey("roleId") === 3 && (
          <button className="w-100 btn btn-lg btn-primary"
              onClick={() => navigate(`/institutions/`)}>
              Confirmar asistencia</button>
        )}
        </div>
      </div>
    </>
  );

};

export default Assists;