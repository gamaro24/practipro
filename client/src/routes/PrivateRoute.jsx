import React from "react";
import Home from "../components/Home/Home";
import { allowAllUsers, getDataUserByKey, isAuthenticated } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { Error404 } from "../components/Error404/Error404";

export default function PrivateRoute({ children, role }) {
  const auth = isAuthenticated();
  const userRol = getDataUserByKey("roleId");
  const allowUser = role.includes(Number(userRol));
  
  //const navigate = useNavigate();

  return auth && allowUser ? <Home> {children} </Home> : <Error404/>;
}
