import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalDelete from "../Modals/ModalDelete";
import { UsersList } from "./UsersList";
import Select from "react-select";
import { getDataUserByKey, translateRole } from "../../helpers/helpers";
import { UserContext } from "../../context/User/UserContext";
import { RegisterContext } from "../../context/Register/RegisterContext";
import "./users.css";
import { PaginationCustom } from "../Pagination/Pagination";

const Users = ({ showModalCertificate }) => {
  const navigate = useNavigate();
  const roleIdAdmin = getDataUserByKey("roleId") === 1;
  const roleIdLogged = getDataUserByKey("roleId");
  const universityId = getDataUserByKey("universityId");
  const location = useLocation();
  const { pathname } = location;

  const { getAllUsers, userState, getUsersFiltered } = useContext(UserContext);
  const { usersSelector, users, usersFiltered, totalUsersPages } = userState;

  const { getAllRoles, registerState } = useContext(RegisterContext);
  const { rolesSelector } = registerState;


  const initialFilters = {
    name: "",
    roleIdLogged: roleIdLogged,
    id: "",
    universityId: (roleIdAdmin ? "" : universityId),
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [userToDelete, setUserToDelete] = useState(false);
  const [page, setPage] = useState(1);

  const handleChangeFilter = (e, name) => {
    if (e) {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      });
    } else {
      setFilters({
        ...filters,
        [name]: "",
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    getUsersFiltered(1, filters);
  };

  useEffect(() => {
    if (users.length === 0) {
      getAllUsers();
    }
    if (rolesSelector.length === 0) {
      getAllRoles();
    }
    getUsersFiltered(page, filters);
  }, [page]);

  const translatedRoles = rolesSelector.map(role => ({
    ...role,
    label: translateRole(role.label)
  }));

  return (
    <>
      {showDeleteModal ? (
        <ModalDelete entity={userToDelete} showAlert={setShowDeleteModal} />
      ) : null}

      <div className="ms-3 me-3">
        <h2 className="text-center"> {roleIdAdmin ? "Listado de Alumnos" : "Listado de Usuarios"} </h2>
        {roleIdAdmin ? (
          <div className="container-fluid">
  <form
    method="get"
    className="d-flex align-items-center gap-3"
    onSubmit={handleSubmit}
  >
    <div className="" style={{ minWidth: "200px" }}>
      <label htmlFor="roleId" className="form-label">
        Rol
      </label>
      <Select
        id="roleId"
        options={translatedRoles}
        placeholder="Seleccione..."
        name="roleId"
        isClearable={true}
        className="w-100"
        onChange={(e) => handleChangeFilter(e, "roleId")}
      />

    </div>
    <button className="btn btn-primary d-flex align-items-center" type="submit">
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </form>
</div>

        ) : null}
        {usersFiltered.length > 0 ? (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>DNI</th>
                    <th>Email</th>
                    {roleIdAdmin ? (<th>Rol</th>) : (<th>Rotaciones</th>)}
                    {roleIdAdmin ? (<th>Editar</th>) : ""}
                    {roleIdAdmin ? (<th>Eliminar</th>) : ""}
                  </tr>
                </thead>
                <tbody>
                  {usersFiltered.map((user) => (
                    <UsersList
                      showModalCertificate={showModalCertificate}
                      user={user}
                      showAlert={setShowDeleteModal}
                      setUserToDelete={setUserToDelete}
                      key={user.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <PaginationCustom
              currentPage={page}
              totalPages={totalUsersPages}
              paginate={setPage}
            />
          </>
        ) : (
          <p className="text-center">No hay registros</p>
        )}
      </div>
    </>
  );
};
export default Users;
