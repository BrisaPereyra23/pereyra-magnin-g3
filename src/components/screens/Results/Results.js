import React, { Component } from "react";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import "./Results.css";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultadosMovies: [],
      resultadosSeries: [],
      cargando: true,
      error: null,
      descripcionVisible: [],
    };
  }

  componentDidMount() {
    this.fetchResults();
  }

  componentDidUpdate(prevProps) {
  const queryCambio = prevProps.match.params.query !== this.props.match.params.query;
  const tipoCambio = prevProps.match.params.tipo !== this.props.match.params.tipo;

  if (queryCambio) {
    this.setState({ cargando: true }, () => this.fetchResults());
  } else if (tipoCambio) {
    this.setState({ cargando: true }, () => this.fetchResults());
  }
}


  fetchResults = () => {
    const tipoBusqueda = this.props.match.params.tipo;
    const query = this.props.match.params.query;
    let url = "";

    if (tipoBusqueda === "movies") {
      url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else if (tipoBusqueda === "series") {
      url = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else {
      this.setState({ error: true, cargando: false });
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (tipoBusqueda === "movies") {
          this.setState({
            resultadosMovies: data.results,
            cargando: false,
            error: null,
          });
        } else {
          this.setState({
            resultadosSeries: data.results,
            cargando: false,
            error: null,
          });
        }
      })
      .catch((error) => {
        this.setState({ error, cargando: false });
      });
  };
 manejarDescripcion(id) {
  let visible = this.state.descripcionVisible;

  if (visible.includes(id)) { 
    visible = visible.filter(function (item) {
      return item !== id;
    });
  } else {
    let nuevo = [];
    visible.map(function (item) {
      nuevo.push(item);
    });
    nuevo.push(id);
    visible = nuevo;
  }  this.setState({ descripcionVisible: visible }); 
} 


  render() {
    const resultadosMovies = this.state.resultadosMovies;
    const resultadosSeries = this.state.resultadosSeries;
    const cargando = this.state.cargando;
    const error = this.state.error;

    const tipoBusqueda = this.props.match.params.tipo;
    const query = this.props.match.params.query;

    if (cargando) {
      return <Loader />;
    }
    if (error) {
      return <NotFound/>;
    }

    const resultados =
      tipoBusqueda === "movies" ? resultadosMovies : resultadosSeries;

    return (
      <div>
        <Header />
        <div className="container">
          <h2 className="alert alert-primary">
            Resultados para "{query}" en{" "}
            {tipoBusqueda === "movies" ? "Películas" : "Series"}
          </h2>

          <section className="row cards results">
            {resultados.length === 0 ? (
              <p>No se encontraron resultados.</p>
            ) : (
              resultados.map((item) => {
                const descripcionActiva =
                  this.state.descripcionVisible.includes(item.id);

                return (
                  <article
                    className="single-card col-md-3 mb-4"
                    key={item.id}>
                    <img
                      className="card-img-top"
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                          : "https://via.placeholder.com/500x750?text=Sin+imagen"
                      }
                      alt={item.title ? item.title: item.name ? item.name : "Sin título"}/>
                    <div className="card-body">
                      <h5 className="card-title">{item.title ? item.title : item.name}</h5>
                      {descripcionActiva && (
                        <p className="card-text">
                          {item.overview ? item.overview : "Sin descripción."}
                        </p>
                      )}

                      <button
                        onClick={() => this.manejarDescripcion(item.id)}>
                        {descripcionActiva ? "Ocultar descripción" : "Ver descripción"}
                      </button>

                      <Link
                        to={
                          tipoBusqueda === "movies"? `/detail/movies/${item.id}`: `/detail/series/${item.id}`
                        }
                        className="btn-ver-mas">
                        Ver más</Link>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default Results;
