import React from "react";
import Formulario from "../Formulario/Formulario";
import { Link } from "react-router-dom";

function NavBar() {
  const Opciones = [
    { nombre: "Home", path: "/" },
    { nombre: "Favorites", path: "/favorites" },
    { nombre: "Movies", path: "/movies" },
    { nombre: "Series", path: "/series" }
  ];
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        {Opciones.map((OpcionMenu, idx) => (
          <li key={idx}>
            <Link to={OpcionMenu.path}>{OpcionMenu.nombre}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-user">
      <img src="/img/user.jpg" className="user-img" alt="usuario" />
      <span className="user-name">Pepe Argento</span>
      </div>
      <Formulario />
    </nav>
    
  );
}

export default NavBar;



