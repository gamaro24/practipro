import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { CarrerContext } from "../../context/Carrer/CarrerContext";
import { UniversityContext } from "../../context/University/UniversityContext";

const CarrersForm = () => {

    const navigate = useNavigate();

    const { createNewCarrer, carrerState, getCarrerData, editCarrer } = useContext(CarrerContext);
    const { getAllUniversities, universityState } = useContext(UniversityContext);
    const { carrerData } = carrerState;
    const { universities } = universityState;

    const [carrerRegister, setCarrerRegister] = useState(carrerData);

    const { id } = useParams();
    const isEditForm = window.location.pathname === `/carrer/edit/${id}`;

    // Update variable onchange of data
    const handleChangeRegister = (e, name) => {
        if (e) {
            setCarrerRegister({
                ...carrerRegister,
                [e.target.name]: e.target.value,
            });
        } else {
            setCarrerRegister({
                ...carrerRegister,
                [name]: "",
            });
        }
    };

    // Validations for submit register to DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditForm) {
            await editCarrer(carrerRegister);
            navigate("/carrers");
        } else {
            await createNewCarrer(carrerRegister);
            navigate("/carrers");
        }
    };

    useEffect(() => {
        if (universities.length === 0) {
            getAllUniversities();
        }
        if (isEditForm) {
            getCarrerData(id);
        }
    }, []);

    useEffect(() => {
        setCarrerRegister(carrerData);
    }, [carrerData]);


    return (
        <div className="login-view animate__animated animate__fadeInUp p-3">
            <div className="card card-register boxcard-register-responsive shadow ">
                <div className="form-signin text-center">
                    <div className="card-body">

                        <h3 className="card-title h3 mb-3 fw-normal">{isEditForm ? "Editar Carrera" : "Registrar Carrera"}</h3>
                        <form onSubmit={handleSubmit}>

                            {/* NAME */}

                            <div className="form-floating">
                                <input
                                    id="floatingNameCarrer"
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={carrerRegister?.name}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingNameCarrer">Nombre</label>
                            </div>

                            <div className="p-2"></div>


                            {/* UNIVERSITY DROPDOWN */}

                            <div className="form-floating">
                                <select
                                    id="floatingUniversityId"
                                    className="form-control"
                                    type="text"
                                    name="universityId"
                                    value={carrerRegister?.universityId}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="" disabled>Seleccione universidad</option>
                                    {universities?.map((university) => (
                                        <option key={university.id} value={university.id}>
                                            {university.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="floatingUniversityId">Universidad</label>
                            </div>

                            <div className="p-2"></div>

                            {/* CODE */}

                            <div className="form-floating">
                                <input
                                    id="floatingCode"
                                    className="form-control"
                                    type="text"
                                    name="code"
                                    value={carrerRegister?.code}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingCode">Código</label>
                            </div>

                            <div className="p-2"></div>

                            {/* DESCRIPTION */}

                            <div className="form-floating">
                                <textarea
                                    id="floatingDescription"
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    value={carrerRegister?.description}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingDescription">Descripción</label>
                            </div>



                            <div className="p-2"></div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">{isEditForm ? "Editar Carrera" : "Registrar Carrera"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default CarrersForm;