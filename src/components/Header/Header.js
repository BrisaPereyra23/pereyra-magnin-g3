import React from "react";
import Navbar from "./../Navbar/Navbar"; 
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="site-title">Popcorn Studio</h1>
        <img src="./img/Logo_Peliculas.png" className="peliculas-image" alt="logo" />
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
// claro aca tiene que ir el navbar concatenado 
