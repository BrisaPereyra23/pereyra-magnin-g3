import React from "react";
import Navbar from "./../Navbar/Navbar"; 
import "./Header.css";
import { Link } from "react-router-dom";
import Formulario from "../Formulario/Formulario";
function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <section className="header-section">
         <img src="/img/Logo_Peliculas.png" className="peliculas-image" alt="logo" />
          <h1 className="site-title">Popcorn Studio</h1>
        </section>
        <Navbar/>
        <Formulario/>
      </div>
    </header>
  );
}

export default Header;

