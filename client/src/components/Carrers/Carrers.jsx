import React, { useState, useContext, useEffect } from 'react';
import "./carrers.css";
import { CarrerContext } from "../../context/Carrer/CarrerContext";
import { CarrersList } from './CarrersList';
import { useNavigate } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import { PaginationCustom } from "../Pagination/Pagination";


const Carrers = () => {

  const initialFilters = {

    id: "",
    universityId: "",
    name: "",
    code: "",
  };

  const navigate = useNavigate();

  const { createNewCarrer, carrerState, getAllCarrers, getCarrersFiltered } = useContext(CarrerContext);
  const { carrers, totalCarrersPages, carrersFiltered } = carrerState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carrerToDelete, setCarrerToDelete] = useState(false);

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [carrer, setcarrer] = useState({
    universityId: "",
    name: "",
    code: "",
    description: "",
  });


  /*   const handleSubmit = async (e) => {
      e.preventDefault();
      await createNewCarrer(carrer);
      getAllCarrers();
    };
  
    const handleChangeCarrer = (e) => {
      setcarrer({
        ...carrer,
        [e.target.name]: e.target.value,
      });
    }; */


  useEffect(() => {
    if (carrers?.length === 0) {
      getAllCarrers();
    }
    getCarrersFiltered(page, filters);
  }, [page]);

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={carrerToDelete} showAlert={setShowDeleteModal} />
      ) : null}
      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Carreras</h2>
        {
          carrersFiltered?.length > 0 ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover text-center">
                  <thead>
                    <tr>
                      <th>Universidad</th>
                      <th>Nombre</th>
                      <th>Codigo</th>
                      <th>Descripcion</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrersFiltered.map((carrer) => (
                      <CarrersList
                        carrer={carrer}
                        key={carrer.id}
                        showAlert={setShowDeleteModal}
                        setCarrerToDelete={setCarrerToDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>


              <PaginationCustom
                currentPage={page}
                totalPages={totalCarrersPages}
                paginate={setPage}
              />
            </>
          ) : (
            <p className="text-center">No hay registros</p>
          )}
        <div className="p-2 text-center">
          <button className="btn btn-lg btn-primary"
            onClick={() => navigate("/carrer/create/")}>
            Agregar Carrera</button>
        </div>
      </div>
    </>
  );

};

export default Carrers;