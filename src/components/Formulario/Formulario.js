import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/results/${this.state.busqueda}`);
  };

  controlarCambio = (e) => {
    this.setState({ busqueda: e.target.value });
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="searchData"
          placeholder="Buscar..."
          value={this.state.busqueda}
          onChange={this.controlarCambio}
        />
        <button type="submit">Buscar</button>
      </form>
    );
  }
}

export default withRouter(Formulario);
