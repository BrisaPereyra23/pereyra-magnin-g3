import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const Opciones = [
    { nombre: "Home", path: "/" },
    { nombre: "Detail", path: "/detail" },
    { nombre: "Movies", path: "/movies" },
    { nombre: "Series", path: "/series" },
    { nombre: "Results", path: "/results" }
  ];
  return (
    <nav className="navbar">
      <ul className="main-nav">
        {Opciones.map((OpcionMenu, idx) => (
          <li key={idx}>
            <Link to={OpcionMenu.path}>{OpcionMenu.nombre}</Link>
          </li>
        ))}
      </ul>
      <ul className="user-nav">
        <li className="user">
          Nombre usuario{" "}
          <img src="./img/user.jpg" className="user-image" alt="usuario" />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar