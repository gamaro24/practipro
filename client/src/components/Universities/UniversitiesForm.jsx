import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { UniversityContext } from "../../context/University/UniversityContext";

const UniversitiesForm = () => {

    const navigate = useNavigate();

    const { createNewUniversity,universityState, getUniversityData, editUniversity } = useContext(UniversityContext);
    const { universityData } = universityState;

    const [universityRegister, setUniversityRegister] = useState(universityData);

    const { id } = useParams();
    const isEditForm = window.location.pathname === `/university/edit/${id}`;

    // Update variable onchange of data
    const handleChangeRegister = (e, name) => {
        if (e) {
            setUniversityRegister({
                ...universityRegister,
                [e.target.name]: e.target.value,
            });
        } else {
            setUniversityRegister({
                ...universityRegister,
                [name]: "",
            });
        }
    };

      // Validations for submit register to DB
      const handleSubmit = async (e) => {
        e.preventDefault();
          if(isEditForm){
            await editUniversity(universityRegister);
            navigate("/universities");
          } else{
            createNewUniversity(universityRegister);
            navigate("/universities");
          }
    
        };


        useEffect(() => {
            if (isEditForm) {
              getUniversityData(id);
            }
          }, []);

          useEffect(() => {
            setUniversityRegister(universityData);
          }, [universityData]);


    return (
        <div className="login-view animate__animated animate__fadeInUp p-3">
            <div className="card card-register boxcard-register-responsive shadow ">
                <div className="form-signin text-center">
                    <div className="card-body">

                        <h3 className="card-title h3 mb-3 fw-normal">{isEditForm ? "Editar Universidad" : "Registrar Universidad"}</h3>
                        <form onSubmit={handleSubmit}>

                            {/* NAME */}

                            <div className="form-floating">
                                <input
                                    id="floatingName"
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={universityRegister?.name}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingName">Nombre</label>
                            </div>

                            <div className="p-2"></div>

                            {/* ADDRESS */}

                            <div className="form-floating">
                                <input
                                    id="floatingUserName"
                                    className="form-control"
                                    type="text"
                                    name="address"
                                    value={universityRegister?.address}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingName">Dirección</label>
                            </div>

                            <div className="p-2"></div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">{isEditForm ? "Editar Universidad" : "Registrar Universidad"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default UniversitiesForm;