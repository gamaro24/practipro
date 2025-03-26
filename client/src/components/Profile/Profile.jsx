import React, { useContext, useEffect } from 'react';
import "./profile.css";

import { UniversityContext } from "../../context/University/UniversityContext";
import { CarrerContext } from "../../context/Carrer/CarrerContext";
import { useNavigate } from "react-router-dom";
import { getDataUserByKey, reqAxios } from "../../helpers/helpers";

const Profile = () => {

    const universityId = (getDataUserByKey("universityId"));
    const carrerId = (getDataUserByKey("carrerId"));


    const { universityState, getUniversityData } = useContext(UniversityContext);
    const { universityData } = universityState;

    const { carrerState, getCarrerData } = useContext(CarrerContext);
    const { carrerData } = carrerState;

    useEffect(() => {
        if (!universityData.id && universityId) {
            getUniversityData(universityId);
        }
    }, [universityData, universityId, getUniversityData]);

    useEffect(() => {
        if (!carrerData.id && carrerId) {
            getCarrerData(carrerId);
        }
    }, [carrerData, carrerId, getCarrerData]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await reqAxios("POST", "/user/recoverpassword", "", {email: getDataUserByKey("email")});
    };

    const roleId = getDataUserByKey("roleId");
    const roleNames = {
        1: "Administrador",
        2: "Profesor",
        3: "Estudiante",
        4: "Supervisor"
    };

    return (
        <div className="login-view animate__animated animate__fadeInUp p-3">
            <div className="card card-register boxcard-register-responsive shadow ">
                <div className="form-signin text-center">
                    <div className="card-body">

                        <h3 className="card-title h3 mb-3 fw-normal">Perfil { }</h3>

                        <div className="p-2"></div>
                        <div className="flex items-center bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto">
                            {/* Profile Image */}
                            <div className="mr-4 w-16 h-16 overflow-hidden rounded-full border-4 border-blue-500">
                                <img
                                    src="src/assets/user2.jpg"
                                    alt="Perfil"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* User Details */}
                            <div>
                                <h5 className="text-lg font-bold">{`${getDataUserByKey("name")} ${getDataUserByKey("lastname")}`}</h5>
                                <p className="text-gray-600">{roleNames[roleId] || ""}</p>
                                <p className="text-sm">
                                    <strong>Email:</strong> {getDataUserByKey("email")}
                                </p>
                                <p className="text-sm">
                                    <strong>Teléfono:</strong> {getDataUserByKey("cellphone")}
                                </p>
                                <p className="text-sm">
                                    <strong>Universidad:</strong> {universityData?.name}
                                </p>
                                <p className="text-sm">
                                    <strong>Carrera:</strong> {carrerData?.name}
                                </p>
                            </div>

                            <div className="p-2">
                                <h6
                                    className="w-100 btn btn-lg btn-primary" onClick={handleSubmit}>
                                    Olvide mi contraseña
                                </h6>


                            </div>
                        </div>

                        <div className="p-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;