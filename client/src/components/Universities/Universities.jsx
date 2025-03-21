import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from "react-bootstrap";
import "../../App.css";
import "./universities.css";
import { Footer } from "../Footer/Footer";
import { AppContext } from "../../context/App/AppContext";
import { isAuthenticated } from "../../helpers/helpers";
import Navbar from "../NavBar/NavBar";
import { UniversityContext } from "../../context/University/UniversityContext";
import { UniversitiesList } from './UniversitiesList';
import { useNavigate, useParams } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import { PaginationCustom } from "../Pagination/Pagination";



const Universities = () => {

  const initialFilters = {
    name: "",
    id: "",
  };

  const navigate = useNavigate();

  const { createNewUniversity, universityState, getAllUniversities, getUniversitiesFiltered } = useContext(UniversityContext);
  const { universities, totalUniversitiesPages, universitiesFiltered} = universityState;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState(false);

  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);

  const [university, setuniversity] = useState({
    name: "",
  });

    
  /*   const handleSubmit = async (e) => {
      e.preventDefault();
      await createNewUniversity(university);
      getAllUniversities();
    };
  
    const handleChangeUniversity = (e) => {
      setuniversity({
        ...university,
        [e.target.name]: e.target.value,
      });
    }; */


    useEffect(() => {
      if (universities?.length === 0) {
        getAllUniversities();
      }
      getUniversitiesFiltered(page, filters);
    }, [page]);


  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={universityToDelete} showAlert={setShowDeleteModal} />
      ) : null}
      <div className="ms-3 me-3">
        <h2 className="text-center">Listado de Universidades</h2>
        {
          universitiesFiltered?.length > 0 ? (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Direccion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {universitiesFiltered.map((university) => (
                      <UniversitiesList
                        university={university}
                        key={university.id}
                        showAlert={setShowDeleteModal}
                        setUniversityToDelete={setUniversityToDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-2">
                <button className="w-100 btn btn-lg btn-primary"
                  onClick={() => navigate("/university/create/")}>
                  Agregar universidad</button>
              </div>
            <PaginationCustom
              currentPage={page}
              totalPages={totalUniversitiesPages}
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

export default Universities;