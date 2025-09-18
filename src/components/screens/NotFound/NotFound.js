import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1 className="alert alert-danger">404 Página no encontrada</h1>
      <p>El contenido que buscás no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al Inicio
      </Link>
    </div>
  );
}

export default NotFound;
