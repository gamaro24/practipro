import React, { useState } from "react";
import { reqAxios } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

const initialStateRecover = {
  email: "",
};

const RecoverPassword = () => {
  const navigate = useNavigate();
  const [formRecover, setFormRecover] = useState(initialStateRecover);
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeRecover = (e) => {
    setFormRecover({
      ...formRecover,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await reqAxios("POST", "/user/recoverpassword", "", formRecover);
    if (data.status && data.status === 200) {
      navigate("/login");
    }
  };

  return (
    <div className="login-view animate__animated animate__fadeInUp p-3">
      <div className="card card-register boxcard-register-responsive shadow">
        <div className="form-signin text-center">
          <div className="card-body">
            <h3 className="card-title h3 mb-3 fw-normal">Recuperar Contraseña</h3>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  id="floatingUsername"
                  className="form-control"
                  type="email"
                  name="email"
                  value={formRecover.email}
                  onChange={handleChangeRecover}
                  required
                />
                <label htmlFor="floatingEmail">Correo</label>
              </div>

              <div className="p-2"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Enviar correo de recuperación
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
