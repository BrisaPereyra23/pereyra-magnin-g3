import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NotFound from "../screens/NotFound/NotFound";
import "./Formulario.css";

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      tipo: "movies",
    };
  }

  componentDidMount() {
    const tipoUrl = this.props.match.params.tipo;
    if (tipoUrl === "movies" || tipoUrl === "series") {
      this.setState({ tipo: tipoUrl });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tipo, busqueda } = this.state;

    if (busqueda === "") return;

    if (tipo === "movies") {
      this.props.history.push(`/results/movies/${busqueda}`);
    } else if (tipo === "series") {
      this.props.history.push(`/results/series/${busqueda}`);
    } else {
      return <NotFound />;
    }
  };

  controlarCambio = (e) => {
    this.setState({ busqueda: e.target.value });
  };

  controlarTipo = (e) => {
    this.setState({ tipo: e.target.value });
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="searchData"
            placeholder="Buscar..."
            value={this.state.busqueda}
            onChange={this.controlarCambio}
          />
        </div>
        <section className="buttonsRadio">
          <div>
            <label>
              <input
                type="radio"
                name="tipo"
                value="series"
                checked={this.state.tipo === "series"}
                onChange={this.controlarTipo}
              />
              Serie
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="tipo"
                value="movies"
                checked={this.state.tipo === "movies"}
                onChange={this.controlarTipo}
              />
              Película
            </label>
          </div>
          <div>
            <button type="submit">Buscar</button>
          </div>
        </section>
      </form>
    );
  }
}

export default withRouter(Formulario);




/* FORMULARIO ANTES DEL RADIO BUTTOM
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NotFound from "../screens/NotFound/NotFound";

class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: "",
      tipo: "movies",
    };
  }

 handleSubmit = (e) => {
  e.preventDefault();
  const busqueda = this.state.busqueda;
  this.props.history.push(`/results/${busqueda}`);
}; 


handleSubmit = (e) => {
    e.preventDefault();
    const tipo = this.state.tipo;
    const busqueda = this.state.busqueda

    if (tipo === "movies") {
      this.props.history.push(`/results/movies/${busqueda}`);
    } else if (tipo === "series") {
      this.props.history.push(`/results/series/${busqueda}`);
    } else {
      <NotFound/>
    }
  }; //si queremos diferencias series y peliculas

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

export default withRouter(Formulario);*/
