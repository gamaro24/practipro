import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { InstitutionContext } from "../../context/Institution/InstitutionContext";

const CarrersForm = () => {

    const navigate = useNavigate();

    const { createNewInstitution, institutionState, getInstitutionData, editInstitution } = useContext(InstitutionContext);
    const { institutionData } = institutionState;

    const [institutionRegister, setInstitutionRegister] = useState(institutionData);

    const { id } = useParams();
    const isEditForm = window.location.pathname === `/institution/edit/${id}`;

    // Update variable onchange of data
    const handleChangeRegister = (e, name) => {
        if (e) {
            setInstitutionRegister({
                ...institutionRegister,
                [e.target.name]: e.target.value,
            });
        } else {
            setInstitutionRegister({
                ...institutionRegister,
                [name]: "",
            });
        }
    };

    // Validations for submit register to DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditForm) {
            await editInstitution(institutionRegister);
            navigate("/institutions");
        } else {
            createNewInstitution(institutionRegister);
            navigate("/institutions");
        }
    };

    useEffect(() => {
        if (isEditForm) {
            getInstitutionData(id);
        }
    }, []);

    useEffect(() => {
        setInstitutionRegister(institutionData);
    }, [institutionData]);


    return (
        <div className="login-view animate__animated animate__fadeInUp p-3">
            <div className="card card-register boxcard-register-responsive shadow ">
                <div className="form-signin text-center">
                    <div className="card-body">

                        <h3 className="card-title h3 mb-3 fw-normal">{isEditForm ? "Editar Instituto" : "Registrar Instituto"}</h3>
                        <form onSubmit={handleSubmit}>

                            {/* NAME */}

                            <div className="form-floating">
                                <input
                                    id="floatingNameInstitution"
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    value={institutionRegister?.name}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingNameInstitution">Nombre</label>
                            </div>

                            <div className="p-2"></div>

                            {/* ADDRESS */}

                            <div className="form-floating">
                                <input
                                    id="floatingAddress"
                                    className="form-control"
                                    type="text"
                                    name="address"
                                    value={institutionRegister?.address}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingAddress">Dirección</label>
                            </div>

                            <div className="p-2"></div>

                            {/* DESCRIPTION */}

                            <div className="form-floating">
                                <textarea
                                    id="floatingDescription"
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    value={institutionRegister?.description}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingDescription">Descripción</label>
                            </div>



                            <div className="p-2"></div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">{isEditForm ? "Editar Instituto" : "Registrar Instituto"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default CarrersForm;