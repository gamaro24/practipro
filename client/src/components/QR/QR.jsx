import React from "react";
import { useState } from "react";
import { reqAxios } from "../../helpers/helpers";
import { useNavigate, useParams } from "react-router-dom";

const QR = () => {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const initialStateLogin = {
        username: "",
        password: "",
        institutionId: id,
    };
    const [formLogin, setFormLogin] = useState(initialStateLogin);
    const [showPassword, setShowPassword] = useState(false);
    const [putDisabled, setPutDisabled] = useState(false);

    const handleChangeLogin = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await reqAxios("POST", "/user/login", "", formLogin);

        if (data.status && data.status === 200) {
            //setRefreshRoleIdAndUserId(true);
            //Guardo la informacion del usuario en el sessionStorage
            sessionStorage.setItem("user", JSON.stringify(data.data.user));
            sessionStorage.setItem("token", JSON.stringify(data.data.token));
            navigate("/");
        }

    };

    return (
        <div className="login-view animate__animated animate__fadeInUp p-3">
            <div className="card card-register boxcard-register-responsive shadow ">
                <div className="form-signin text-center">
                    <div className="card-body">
                        <h3 className="card-title h3 mb-3 fw-normal">Registrar Asistencia</h3>
                        <form onSubmit={handleSubmit}>

                            {/* USERNAME */}

                            <div className="form-floating">
                                <input
                                    id="floatingUsername"
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    value={formLogin.username}
                                    onChange={handleChangeLogin}
                                    required
                                />
                                <label htmlFor="floatingUsername">Username</label>
                            </div>

                            <div className="p-2"></div>

                            {/* USERNAME */}

                            <div className="form-floating">
                                <input
                                    id="floatingPassword"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    value={formLogin.password}
                                    onChange={handleChangeLogin}
                                    required
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="p-2"></div>

                            <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default QR;