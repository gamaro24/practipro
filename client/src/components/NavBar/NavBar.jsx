import "./navbar.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getDataUserByKey } from "../../helpers/helpers";
import NavBarItems from "./NavBarItems";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state

  const loggout = () => {
    sessionStorage.clear();
    window.location.pathname = "/";
  };

  const getRole = Number(getDataUserByKey("roleId"));

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu on navigation
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleNavigate("/")}>
        <img className="logoImg" src="src/assets/practiproiso.svg" alt="logo" />
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* Navbar Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => handleNavigate("/")}>Inicio</li>

        {NavBarItems.items.map((item, i) =>
          item.authRole.includes(getRole) ? (
            <li key={i} onClick={() => handleNavigate(item.navigate)}>
              {item.name}
            </li>
          ) : null
        )}

        {!isAuthenticated() && (
          <li onClick={() => handleNavigate("/login")}>Login</li>
        )}

        {isAuthenticated() && <li onClick={loggout}>Salir</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
