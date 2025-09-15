import React, { Component } from "react";

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src="/cargando.gif" alt="Cargando..." />
      </div>
    );
  }
}
export default Loader;
