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
    <nav className="navbar">
      <ul className="nav-menu">
        {Opciones.map((OpcionMenu, idx) => (
          <li key={idx}>
            <Link to={OpcionMenu.path}>{OpcionMenu.nombre}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-user">
        <img src="./img/user.jpg" className="user-img" alt="usuario" />
      </div>
    </nav>
  );
}

export default NavBar;

// bueno esto creo que esta bien ya asi que deberia de funcar pero deje lo que pusimos antes en verde a ver que onda



// import React from "react";
////import { Link } from "react-router-dom";

//function NavBar() {
  //const opciones = [
    //{ nombre: "Home", path: "/" },
   // { nombre: "Favorites", path: "/favorites" },
    //{ nombre: "Movies", path: "/movies" },
   // { nombre: "Series", path: "/series" }
  //];

  //return (
    //<nav>
      {/* Menú principal */}
      //<ul className="nav">
        //{opciones.map((opcion, idx) => (
         // <li key={idx}>
          //  <Link to={opcion.path}>{opcion.nombre}</Link>
          //</li>
        //))}
      //</ul>

      {/* Búsqueda + Usuario */}
      //<div className="nav">
       // <form className="search-form" action="/results" method="get">
        //  <input type="text" name="searchData" placeholder="Buscar..." />
         // <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        // </form>

       // <div className="user">
        //  <span>Nombre usuario</span>
        //  <img src="./img/user.jpg" alt="usuario" />
        //  </div>
       //  </div>
      // </nav>
   // );
//}

//export default NavBar;}
