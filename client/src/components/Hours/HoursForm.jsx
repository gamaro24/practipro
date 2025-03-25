import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { HourContext } from "../../context/Hour/HourContext";
import { UniversityContext } from "../../context/University/UniversityContext";
import { CarrerContext } from "../../context/Carrer/CarrerContext";
import { InstitutionContext } from "../../context/Institution/InstitutionContext";
import { format, parseISO } from "date-fns";

const HoursForm = () => {

    const navigate = useNavigate();

    const { createNewHour, hourState, getHourDataEdit, editHour } = useContext(HourContext);
    const { hourData } = hourState;

    const { getInstitutionData, institutionState } = useContext(InstitutionContext);
    const { institutionData } = institutionState;

    const { getAllUniversities, universityState } = useContext(UniversityContext);
    const { universities } = universityState;

    const { getAllCarrers, carrerState } = useContext(CarrerContext);
    const { carrers } = carrerState;

    const [hourRegister, setHourRegister] = useState(hourData);

    const { id } = useParams();
    const isEditForm = window.location.pathname === `/hour/edit/${id}`;

    // Update variable onchange of data
    const handleChangeRegister = (e, name) => {
        if (e) {
            setHourRegister({
                ...hourRegister,
                [e.target.name]: e.target.value,
                
            });
            //console.log(hourRegister?.dateFrom);
            //console.log(new Date("2025-03-10T21:54:00.000Z"));
        } else {
            setHourRegister({
                ...hourRegister,
                [name]: "",
            });
        }
    };

    // Validations for submit register to DB
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditForm) {
            await editHour(hourRegister);
            navigate(`/hours/${id}`);
        } else {
            hourRegister.institutionId = institutionData.id;
            createNewHour(hourRegister);
            navigate(`/hours/${id}`);
        }
    };

    useEffect(() => {
        if (universities.length === 0) {
            getAllUniversities();
        }
        if (carrers.length === 0) {
            getAllCarrers();
        }
        getInstitutionData(institutionData.id);
    }, []);

    useEffect(() => {
        if (isEditForm) {
            getHourDataEdit(id);
        }
    }, []);

    useEffect(() => {
        setHourRegister(hourData);
    }, [hourData]);

    return (
        <div className="login-view animate__animated animate__fadeInUp p-3">
            <div className="card card-register boxcard-register-responsive shadow ">
                <div className="form-signin text-center">
                    <div className="card-body">

                        <h3 className="card-title h3 mb-3 fw-normal">Establecimiento {institutionData.name}</h3>
                        <h3 className="card-title h3 mb-3 fw-normal">{isEditForm ? "Editar Hora" : "Registrar Hora"}</h3>
                        <form onSubmit={handleSubmit}>

                            {/* FECHA DESDE */}

                            <div className="form-floating">
                                <input
                                    id="floatingDateFrom"
                                    className="form-control"
                                    type="datetime-local"
                                    name="dateFrom"
                                    value={hourRegister?.dateFrom ? format(new Date(hourRegister.dateFrom), "yyyy-MM-dd'T'HH:mm") : ""}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingDateFrom">Fecha desde</label>
                            </div>

                            <div className="p-2"></div>

                            {/* FECHA HASTA */}

                            <div className="form-floating">
                                <input
                                    id="floatingDateTo"
                                    className="form-control"
                                    type="datetime-local"
                                    name="dateTo"
                                    value={hourRegister?.dateTo}
                                    onChange={handleChangeRegister}
                                    required
                                />
                                <label htmlFor="floatingDateTo">Fecha hasta</label>
                            </div>

                            <div className="p-2"></div>

                            <input className="form-control" onChange={handleChangeRegister} type="hidden" name="institutionId" value={hourRegister?.institutionId}></input>

                            {/* UNIVERSITY DROPDOWN */}

                            <div className="form-floating">
                                <select
                                    id="floatingUniversityId"
                                    className="form-control"
                                    type="text"
                                    name="universityId"
                                    value={hourRegister?.universityId}
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

                            {/* CARRER DROPDOWN */}

                            <div className="form-floating">
                                <select
                                    id="floatingCarrerId"
                                    className="form-control"
                                    type="text"
                                    name="carrerId"
                                    value={hourRegister?.carrerId}
                                    onChange={handleChangeRegister}
                                    required
                                >
                                    <option value="" disabled>Seleccione Carrera</option>
                                    {carrers?.map((carrer) => (
                                        <option key={carrer.id} value={carrer.id}>
                                            {carrer.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="floatingCarrerId">Carrera</label>
                            </div>

                            <div className="p-2"></div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">{isEditForm ? "Editar Hora" : "Registrar Hora"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default HoursForm;