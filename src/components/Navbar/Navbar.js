import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const Opciones = [
    { nombre: "Home", path: "/" },
    { nombre: "Favorites", path: "/favorites" },
    { nombre: "Movies", path: "/movies" },
    { nombre: "Series", path: "/series" }
  ];
  return (
    <nav className="nav">
      <ul className="nav">
        {Opciones.map((OpcionMenu, idx) => (
          <li key={idx}>
            <Link to={OpcionMenu.path}>{OpcionMenu.nombre}</Link>
          </li>
        ))}
      </ul>
      <ul className="nav">
        <li className="user">
          Nombre usuario{" "}
          <img src="./img/user.jpg" className="user" alt="usuario" />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;