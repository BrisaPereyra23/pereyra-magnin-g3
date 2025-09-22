import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import NavBar from "../../Navbar/Navbar";
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
      favoritos: [],
      descripcionVisible: [],
    };
  }

  componentDidMount() {
    this.fetchSeries();

    let favs = localStorage.getItem("favorites");
    if (favs !== null) {
      this.setState({ favoritos: JSON.parse(favs) });
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
         this.state.series.map(function(serie) {
          nuevas.push(serie);
          });
          resultados.map(function(serie) {
            nuevas.push(serie);
          });
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

  agregarAFavoritos = (serie) => {
    let favs = localStorage.getItem("favorites");
    let favoritos = favs ? JSON.parse(favs) : [];

    let existe = favoritos.find(f => f.id === serie.id && f.type === "tv");
    if (!existe) {
      favoritos.push({
        id: serie.id,
        title: serie.title,
        name: serie.name,
        overview: serie.overview,
        poster_path: serie.poster_path,
        type: "tv",
      });
      localStorage.setItem("favorites", JSON.stringify(favoritos));
      this.setState({ favoritos });
    }
  };

  quitarDeFavoritos = (serieId) => {
    let favs = localStorage.getItem("favorites");
    let favoritos = favs ? JSON.parse(favs) : [];

    favoritos = favoritos.filter(f => !(f.id === serieId && f.type === "tv"));
    localStorage.setItem("favorites", JSON.stringify(favoritos));
    this.setState({ favoritos });
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
    }

    this.setState({ descripcionVisible: visible });
  }


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

  let titulo = serie.name.toLowerCase();
  let buscado = filter.toLowerCase();

  return titulo.includes(buscado);

    });

    return (
      <div className="container">
        <section className="header-section">
        <img src="/img/Logo_Peliculas.png" className="peliculas-image" alt="logo" />
        <h1 className="site-title">Popcorn Studio</h1>
        </section>
      <NavBar />
        <h2 className="alert alert-primary">
          {this.props.match.params.categoria === "popular"
            ? "Series Populares"
            : "Todas las Series"}
        </h2>

        <section className="row cards all-series" id="series">
          {seriesFiltradas.map((serie) => {
            const esFavorito = favoritos.find(f => f.id === serie.id && f.type === "tv");
            const descripcionActiva = this.state.descripcionVisible.includes(serie.id);

            return (
              <article className="single-card-series col-md-3 mb-4" key={serie.id}>
                <img
                  className="card-img-top"
                  src={
                    serie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                      : `https://via.placeholder.com/500x750?text=Sin+imagen`
                  }
                  alt={serie.name ? serie.name: "Sin titulo"}
                />
                <div className="card-body">
                  <h5 className="card-title">{serie.name}</h5>

                  {descripcionActiva && (
                    <p className="card-text">
                      {serie.overview ? serie.overview : "Sin descripción."}
                    </p>
                  )}

                  <button onClick={() => this.manejarDescripcion(serie.id)}>
                    {descripcionActiva ? "Ocultar descripción" : "Ver descripción"}
                  </button>

                  <Link
                    to={"/detail/series/" + serie.id}
                    className="btn-ver-mas"
                  >
                    Ver más
                  </Link>

                  {esFavorito ? (
                    <button
                      className="btn-favorito"
                      onClick={() => this.quitarDeFavoritos(serie.id)}
                    >
                      Sacar de Favoritos
                    </button>
                  ) : (
                    <button
                      className="btn-favorito"
                      onClick={() => this.agregarAFavoritos(serie)}
                    >
                      Agregar a Favoritos
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
