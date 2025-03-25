import React, { useState, useContext, useEffect } from 'react';
import { alertError } from "../../helpers/alerts";
import "./userform.css";
import { UserContext } from "../../context/User/UserContext";
import { RegisterContext } from "../../context/Register/RegisterContext";
import { UniversityContext } from "../../context/University/UniversityContext";
import { CarrerContext } from "../../context/Carrer/CarrerContext";
import { useNavigate, useParams } from "react-router-dom";
import { getDataUserByKey, isAuthenticated, translateRole } from "../../helpers/helpers";

const UserForm = () => {

  const navigate = useNavigate();

  const { createUser, registerState, getAllRoles } = useContext(RegisterContext);
  const { roles } = registerState;

  const { getAllUniversities, universityState } = useContext(UniversityContext);
  const { universities } = universityState;

  const { getAllCarrers, carrerState } = useContext(CarrerContext);
  const { carrers } = carrerState;

  const { userState, getUserData, editUser } = useContext(UserContext);
  const { userData } = userState;

  const [userRegister, setUserRegister] = useState(userData);

  const { id } = useParams();
  const isAdmin = getDataUserByKey("roleId") === 1;
  const isEditForm = window.location.pathname === `/user/edit/${id}`;


  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleChangeRegister = (e, name) => {
    if (e) {
      setUserRegister({
        ...userRegister,
        [e.target.name]: e.target.value,
      });
    } else {
      setUserRegister({
        ...userRegister,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check password
    const passwordsEquals =
      userRegister.password === userRegister.confirmPassword ? true : false;
    if (!passwordsEquals) {
      return alertError("Las contraseñas no coinciden");
    } else {
      if (isEditForm) {
        await editUser(userRegister);
        navigate("/users");
      } else {
        createUser(userRegister);
        navigate("/");
      }

    }
  };

  useEffect(() => {
    if (universities?.length === 0) {
      getAllUniversities();
    }
    if (roles.length === 0) {
      getAllRoles();
    }
    if (carrers.length === 0) {
      getAllCarrers();
    }
    if (isAuthenticated() && isEditForm) {
      getUserData(id);
    }
  }, []);

  useEffect(() => {
    setUserRegister(userData);
  }, [userData]);

  return (
    <div className="login-view animate__animated animate__fadeInUp p-3">
      <div className="card card-register boxcard-register-responsive shadow ">
        <div className="form-signin text-center">
          <div className="card-body">

            <h3 className="card-title h3 mb-3 fw-normal">{isAdmin && isEditForm ? "Editar usuario" : "Registrar Usuario"}</h3>
            <form onSubmit={handleSubmit}>

              {/* NAME */}

              <div className="form-floating">
                <input
                  id="floatingName"
                  className="form-control"
                  type="text"
                  name="name"
                  value={userRegister.name}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingName">Nombre</label>
              </div>

              <div className="p-2"></div>

              {/* Lastname */}

              <div className="form-floating">
                <input
                  id="floatingLastname"
                  className="form-control"
                  type="text"
                  name="lastname"
                  value={userRegister.lastname}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingLastname">Apellido</label>
              </div>

              <div className="p-2"></div>

              {/* USERNAME */}

              <div className="form-floating">
                <input
                  id="floatingUserName"
                  className="form-control"
                  type="text"
                  name="username"
                  value={userRegister.username}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingName">Username</label>
              </div>

              <div className="p-2"></div>

              {/* EMAIL */}

              <div className="form-floating">
                <input
                  id="floatingEmail"
                  className="form-control"
                  type="email"
                  name="email"
                  value={userRegister.email}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingEmail">Email</label>
              </div>

              <div className="p-2"></div>

              {/* ADDRESS */}

              <div className="form-floating">
                <input
                  id="floatingAddress"
                  className="form-control"
                  type="text"
                  name="address"
                  value={userRegister.address}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingAddress">Dirección Mendoza</label>
              </div>

              <div className="p-2"></div>

              {/* REAL_ADDRESS */}

              <div className="form-floating">
                <input
                  id="floatingRealAddress"
                  className="form-control"
                  type="text"
                  name="realaddress"
                  value={userRegister.realaddress}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingRealAddress">Dirección Real</label>
              </div>

              <div className="p-2"></div>

              {/* CELLPHONE */}

              <div className="form-floating">
                <input
                  id="floatingCellphone"
                  className="form-control"
                  type="number"
                  name="cellphone"
                  value={userRegister.cellphone}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingCellphone">Celular</label>
              </div>

              <div className="p-2"></div>

              {/* DNI */}

              <div className="form-floating">
                <input
                  id="floatingDNI"
                  className="form-control"
                  type="number"
                  name="dni"
                  value={userRegister.dni}
                  onChange={handleChangeRegister}
                  required
                />
                <label htmlFor="floatingDNI">DNI</label>
              </div>

              <div className="p-2"></div>

              {/* UNIVERSITY DROPDOWN */}

              <div className="form-floating">
                <select
                  id="floatingUniversity"
                  className="form-control"
                  type="text"
                  name="universityId"
                  value={userRegister.universityId}
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
                <label htmlFor="floatingUniversity">Universidad</label>
              </div>

              <div className="p-2"></div>

              {/* ROLES DROPDOWN */}

              <div className="form-floating">
                <select
                  id="floatingRole"
                  className="form-control"
                  type="text"
                  name="roleId"
                  value={userRegister.roleId}
                  onChange={handleChangeRegister}
                  required
                >
                  <option value="" disabled>Seleccione Rol</option>
                  {roles?.map((role) => (
                    <option key={role.id} value={role.id}>
                      {translateRole(role.name)}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingRole">Rol</label>
              </div>

              <div className="p-2"></div>

              {/* CARRER DROPDOWN */}

              <div className="form-floating">
                <select
                  id="floatingCarrer"
                  className="form-control"
                  type="text"
                  name="carrerId"
                  value={userRegister.carrerId}
                  onChange={handleChangeRegister}
                  required
                >
                  <option value="" disabled>Seleccione carrera</option>
                  {carrers?.map((carrer) => (
                    <option key={carrer.id} value={carrer.id}>
                      {carrer.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingCarrer">Universidad</label>
              </div>

              <div className="p-2"></div>


              {!isEditForm && (
                <>
                  {/* PASSWORD */}
                  <div className="d-flex align-items-center">
                <div className="form-floating flex-grow-1">
                  <input
                    id="floatingPassword"
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userRegister.password}
                    onChange={handleChangeRegister}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="ms-2 p-2 border rounded d-flex align-items-center justify-content-center" style={{ cursor: "pointer", width: "45px", height: "45px" }} onClick={() => setShowPassword(!showPassword)}>
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
                    value={userRegister.confirmPassword}
                    onChange={handleChangeRegister}
                    required
                  />
                  <label htmlFor="floatingConfirmPassword">Confirmar Password</label>
                </div>
                <div className="ms-2 p-2 border rounded d-flex align-items-center justify-content-center" style={{ cursor: "pointer", width: "45px", height: "45px" }} onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                  <i className={`fa-solid ${showPasswordConfirm ? "fa-eye" : "fa-eye-slash"}`}></i>
                </div>
              </div>
                </>
              )}
              <div className="p-2"></div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">{isAdmin && isEditForm ? "Editar usuario" : "Registrar usuario"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;