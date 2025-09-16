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
      favoritos: JSON.parse(localStorage.getItem("favoritosSeries")) || []
    };
  }

  componentDidMount() {
    this.fetchSeries();
  }

  fetchSeries = () => {
    const { categoria } = this.props.match.params;
    let url = "";

    if (categoria === "popular" || categoria === undefined) {
      url = `https://api.themoviedb.org/3/tv/popular?language=es-ES&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else {
      this.props.history.push("/NotFound");
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const resultados = data && data.results ? data.results : [];
        let nuevas = [];

        if (this.state.page === 1) {
          nuevas = resultados;
        } else {
          this.state.series.forEach(serie => nuevas.push(serie));
          resultados.forEach(serie => nuevas.push(serie));
        }

        this.setState({
          series: nuevas,
          cargando: false,
          error: null
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

  agregarAFavoritos = (id) => {
    this.setState((prevState) => {
      const nuevosFavs = [];
      prevState.favoritos.forEach(f => nuevosFavs.push(f));
      if (!nuevosFavs.includes(id)) {
        nuevosFavs.push(id);
        localStorage.setItem("favoritosSeries", JSON.stringify(nuevosFavs));
      }
      return { favoritos: nuevosFavs };
    });
  };

  quitarDeFavoritos = (id) => {
    this.setState((prevState) => {
      const nuevosFavs = prevState.favoritos.filter((favId) => favId !== id);
      localStorage.setItem("favoritosSeries", JSON.stringify(nuevosFavs));
      return { favoritos: nuevosFavs };
    });
  };

  render() {
    const { series, cargando, error, filter, favoritos } = this.state;

    if (cargando && series.length === 0) {
      return <Loader />;
    }
    if (error) {
      return <NotFound />;
    }

    const seriesFiltradas = series.filter((serie) => {
      if (filter === "") return true;
      if (!serie.name) return false;
      return serie.name.toLowerCase().includes(filter.toLowerCase());
    });

    return (
      <div className="container">
        <h2 className="alert alert-primary">
          {this.props.match.params.categoria === "popular"
            ? "Series Populares"
            : "Todas las Series"}
        </h2>

        <section className="row cards all-series" id="series">
          {seriesFiltradas.map((serie) => {
            const esFav = favoritos.includes(serie.id);
            return (
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

                  {esFav ? (
                    <button
                      className="btn-favorito"
                      onClick={() => this.quitarDeFavoritos(serie.id)}
                    >
                      Sacar de Favoritos
                    </button>
                  ) : (
                    <button
                      className="btn-favorito"
                      onClick={() => this.agregarAFavoritos(serie.id)}
                    >
                      Agregar a favoritos
                    </button>
                  )}
                </div>
              </article>
            );
          })}
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
