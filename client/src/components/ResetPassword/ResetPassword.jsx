import React, { useState } from "react";
import { reqAxios } from "../../helpers/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { alertError } from "../../helpers/alerts";

const ResetPassword = () => {

  const { resetToken } = useParams();

  const initialStateRecover = {
    resetToken: resetToken,
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const [formRecover, setFormRecover] = useState(initialStateRecover);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChangeRecover = (e) => {
    setFormRecover({
      ...formRecover,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formRecover.password !== formRecover.confirmPassword) {
      alertError("Las contraseñas no coinciden");
      return;
    }
    const data = await reqAxios("PUT", "/user/resetpassword", "", formRecover);
    if (data.status && data.status === 200) {
      navigate("/login");
    }
  };

  return (
    <div className="login-view animate__animated animate__fadeInUp p-3">
      <div className="card card-register boxcard-register-responsive shadow">
        <div className="form-signin text-center">
          <div className="card-body">
            <h3 className="card-title h3 mb-3 fw-normal">Ingrese nueva Contraseña</h3>
            <form onSubmit={handleSubmit}>
              {/* PASSWORD */}
              <div className="d-flex align-items-center">
                <div className="form-floating flex-grow-1">
                  <input
                    id="floatingPassword"
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formRecover.password}
                    onChange={handleChangeRecover}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div
                  className="ms-2 p-2 border rounded d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer", width: "45px", height: "45px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </div>
              </div>

              <div className="p-2"></div>

              {/* CONFIRM-PASSWORD */}
              <div className="d-flex align-items-center">
                <div className="form-floating flex-grow-1">
                  <input
                    id="floatingConfirmPassword"
                    className="form-control"
                    type={showPasswordConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formRecover.confirmPassword}
                    onChange={handleChangeRecover}
                    required
                  />
                  <label htmlFor="floatingConfirmPassword">Confirmar Password</label>
                </div>
                <div
                  className="ms-2 p-2 border rounded d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer", width: "45px", height: "45px" }}
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  <i className={`fa-solid ${showPasswordConfirm ? "fa-eye" : "fa-eye-slash"}`}></i>
                </div>
              </div>

              <div className="p-2"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Confirmar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
