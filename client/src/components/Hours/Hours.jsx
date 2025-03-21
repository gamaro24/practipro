import React, { useState, useContext, useEffect } from 'react';
import "../../App.css";
import "./hours.css";
import { HourContext } from "../../context/Hour/HourContext";
import { HoursList } from './HoursList';
import { useNavigate, useParams } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import ModalHourRegistry from "../Modals/ModalHourRegistry";
import { PaginationCustom } from "../Pagination/Pagination";
import { InstitutionContext } from '../../context/Institution/InstitutionContext';
import { getDataUserByKey } from "../../helpers/helpers";

const isAdmin = getDataUserByKey("roleId") === 1;


const Hours = () => {

  const { id } = useParams();
  //const idToCreate = window.location.pathname === `/hours/${id}`;

  const initialFilters = {
    userId: getDataUserByKey("id"),
    institutionId: id,
  };

  const navigate = useNavigate();

  const { createNewHour, hourState, getAllHours, getHoursFiltered } = useContext(HourContext);
  const { hours, totalHoursPages, hoursFiltered } = hourState;

  const { getInstitutionData, institutionState } = useContext(InstitutionContext);
  const { institutionData } = institutionState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showHourModal, setShowHourModal] = useState(false);

  const [hourToDelete, setHourToDelete] = useState(false);
  const [hourToRegistry, setHourToRegistry] = useState(false);

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [hour, setHour] = useState({
    dateFrom: "",
    dateTo: "",
    institutionId: "",
    universityId: "",
    carrerId: "",
  });


  useEffect(() => {
    if (hours?.length === 0) {
      getAllHours();
    }
    getHoursFiltered(page, filters);
    getInstitutionData(id);
  }, [page]);

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={hourToDelete} showAlert={setShowDeleteModal} />
      ) : null}
      {showHourModal ? (
        <ModalHourRegistry entity={hourToRegistry} showAlertRegistry={setShowHourModal} />
      ) : null}
      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Horas para : {institutionData.name}</h2>
        {
          hoursFiltered?.length > 0 ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Hora Entrada</th>
                      <th>Hora Salida</th>
                      <th>Universidad</th>
                      <th>Carrera</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hoursFiltered.map((hour) => (
                      <HoursList
                        hour={hour}
                        key={hour.id}
                        showAlert={setShowDeleteModal}
                        setHourToDelete={setHourToDelete}
                        showAlertRegistry={setShowHourModal}
                        setHourToRegistry={setHourToRegistry}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <PaginationCustom
                currentPage={page}
                totalPages={totalHoursPages}
                paginate={setPage}
              />
            </>
          ) : (
            <p className="text-center">No hay registros</p>
          )}

        <div className="p-2">

          {isAdmin && (

            <button className="w-100 btn btn-lg btn-primary"
              onClick={() => navigate(`/hour/create/${id}`)}>
              Agregar Hora</button>

          )}
        </div>

      </div>
    </>
  );

};

export default Hours;