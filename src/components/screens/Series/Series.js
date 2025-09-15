import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import "./Series.css";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      cargando: true,
      error: null,
      page: 1,
      filter: "",
      esFavorito: false,
    };
  }

  componentDidMount() {
    this.fetchSeries();

    // Verificamos si esta serie ya está en favoritos
    let favoritosLocalStorage = localStorage.getItem("favoritosSeries");
    let favoritosParse = JSON.parse(favoritosLocalStorage);

    if (favoritosParse !== null && this.props.id && favoritosParse.includes(this.props.id)) {
      this.setState({ esFavorito: true });
    }
  }

  fetchSeries = () => {
    const { categoria } = this.props.match.params;
    let url = "";

    if (categoria === "popular") {
      url = `https://api.themoviedb.org/3/tv/popular?language=es-ES&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else if (categoria === undefined) {
      url = `https://api.themoviedb.org/3/tv/popular?language=es-ES&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else {
      this.props.history.push("/NotFound");
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let resultados = data && data.results ? data.results : [];
        let nuevas = [];

        if (this.state.page === 1) {
          nuevas = resultados;
        } else {
          this.state.series.map(serie => nuevas.push(serie));
          resultados.map(serie => nuevas.push(serie));
        }

        this.setState({
          series: nuevas,
          cargando: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({ error, cargando: false });
      });
  };

  cargarMas = () => {
    this.setState(
      { page: this.state.page + 1, cargando: true },
      () => this.fetchSeries()
    );
  };

  manejarFiltro = (event) => {
    this.setState({ filter: event.target.value });
  };

  // 🔹 Funciones de favoritos
  agregarAFavoritos = (id) => {
    let favoritosStorage = localStorage.getItem("favoritosSeries");
    let favoritosParse = JSON.parse(favoritosStorage);
    if (favoritosParse !== null) {
      if (!favoritosParse.includes(id)) {
        favoritosParse.push(id);
      }
      localStorage.setItem("favoritosSeries", JSON.stringify(favoritosParse));
    } else {
      let favoritos = [];
      favoritos.push(id);
      localStorage.setItem("favoritosSeries", JSON.stringify(favoritos));
    }
    this.setState({ esFavorito: true });
  }

  quitarDeFavoritos = (id) => {
    let favoritosStorage = localStorage.getItem("favoritosSeries");
    let favoritosParse = JSON.parse(favoritosStorage);
    if (favoritosParse !== null) {
      favoritosParse = favoritosParse.filter(favId => favId !== id);
      localStorage.setItem("favoritosSeries", JSON.stringify(favoritosParse));
    }
    this.setState({ esFavorito: false });
  }

  render() {
    const { series, cargando, error, filter } = this.state;

    if (cargando && series.length === 0) {
      return <Loader/>;
    }
    if (error) {
      return <NotFound />;
    }

    const seriesFiltradas = series.filter((serie) => {
      if (filter === "") return true;
      if (serie.name) {
        let titulo = serie.name.toLowerCase();
        let buscado = filter.toLowerCase();
        for (let i = 0; i <= titulo.length - buscado.length; i++) {
          let iguales = true;
          for (let j = 0; j < buscado.length; j++) {
            if (titulo[i + j] !== buscado[j]) iguales = false;
          }
          if (iguales) return true;
        }
      }
      return false;
    });

    return (
      <div className="container">
        <h2 className="alert alert-primary">
          {this.props.match.params.categoria === "popular"
            ? "Series Populares"
            : "Todas las Series"}
        </h2>

        <section className="row cards all-series" id="series">
          {seriesFiltradas.map((serie) => (
            <article className="single-card-series col-md-3 mb-4" key={serie.id}>
              <img
                className="card-img-top"
                src={
                  serie.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + serie.poster_path
                    : "https://via.placeholder.com/500x750?text=Sin+imagen"
                }
                alt={serie.name}
              />
              <div className="card-body">
                <h5 className="card-title">{serie.name}</h5>
                <p className="card-text">
                  {serie.overview ? serie.overview : "Sin descripción."}
                </p>
                <Link
                  to={"/detail/series/" + serie.id}
                  className="btn-ver-mas"
                >
                  Ver más
                </Link>

                {/* 🔹 Botones favoritos */}
                {this.state.esFavorito 
                  ? <button className="btn-favorito" onClick={() => this.quitarDeFavoritos(serie.id)}>Sacar de Favoritos</button> 
                  : <button className="btn-favorito" onClick={() => this.agregarAFavoritos(serie.id)}>Agregar a favoritos</button>
                }

              </div>
            </article>
          ))}
        </section>

        {series.length > 0 && (
          <button className="btn-ver-todas" onClick={this.cargarMas}>
            Cargar más
          </button>
        )}
      </div>
    );
  }
}

export default Series;
