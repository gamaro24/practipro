import React, { useState } from "react";
import { reqAxios } from "../../helpers/helpers";
import { useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { institutionId } = useParams();

  const initialStateLogin = {
    username: "",
    password: ""
  };

  const [formLogin, setFormLogin] = useState(initialStateLogin);
  const [showPassword, setShowPassword] = useState(false);

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
      if (institutionId) {
        const user = data.data.user;
        await reqAxios("POST", `/assist/createAssistByQR/${institutionId}`, "", {
          userId: user.id,
        });
      }
      sessionStorage.setItem("user", JSON.stringify(data.data.user));
      sessionStorage.setItem("token", JSON.stringify(data.data.token));
      navigate("/");
    }
  };

  return (
    <div className="login-view animate__animated animate__fadeInUp p-3">
      <div className="card card-register boxcard-register-responsive shadow">
        <div className="form-signin text-center">
          <div className="card-body">
            <h3 className="card-title h3 mb-3 fw-normal">Ingresar</h3>
            <form onSubmit={handleSubmit}>
              {/* USERNAME */}
              <div className="form-floating mb-3">
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

              {/* PASSWORD */}
              <div className="d-flex align-items-center">
                <div className="form-floating flex-grow-1">
                  <input
                    id="floatingPassword"
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formLogin.password}
                    onChange={handleChangeLogin}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="ms-2 p-2 border rounded d-flex align-items-center justify-content-center" style={{ cursor: "pointer", width: "45px", height: "45px" }} onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                </div>
              </div>

              <div className="p-2"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
              <div className="p-2">
                <h6
                  className="w-100" style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/recoverpassword")}>
                    Olvide mi contraseña
                </h6>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
