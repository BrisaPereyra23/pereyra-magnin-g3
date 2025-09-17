import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import "./Movies.css";

class Movies extends Component {
 constructor(props) {
  super(props);
  this.state = {
    movies: [],
    cargando: true,
    error: null,
    page: 1,
    filter: "",
    favoritos: [],
    descripcionVisible: [], 
  };
  }
  

  componentDidMount() {
    this.fetchMovies();
    let favs = localStorage.getItem("favorites");
    if (favs !== null) {
      this.setState({ favoritos: JSON.parse(favs) });
    }
  }

  fetchMovies = () => {
    const { categoria } = this.props.match.params;
    let url = "";

    if (categoria === "popular") {
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else if (categoria === undefined) {
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
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
          this.state.movies.map(function (peli) {
            nuevas.push(peli);
          });
          resultados.map(function (peli) {
            nuevas.push(peli);
          });
        }

        this.setState({
          movies: nuevas,
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
      () => this.fetchMovies()
    );
  };

  manejarFiltro = (event) => {
    this.setState({ filter: event.target.value });
  };

  agregarAFavoritos = (movie) => {
    let favs = localStorage.getItem("favorites");
    let favoritos = favs ? JSON.parse(favs) : [];

    let existe = favoritos.find(f => f.id === movie.id && f.type === "movie");
    if (!existe) {
      favoritos.push({
        id: movie.id,
        title: movie.title,
        name: movie.name,
        overview: movie.overview,
        poster_path: movie.poster_path,
        type: "movie",
      });
      localStorage.setItem("favorites", JSON.stringify(favoritos));
      this.setState({ favoritos });
    }
  };

  quitarDeFavoritos = (movieId) => {
    let favs = localStorage.getItem("favorites");
    let favoritos = favs ? JSON.parse(favs) : [];

    favoritos = favoritos.filter(f => !(f.id === movieId && f.type === "movie"));
    localStorage.setItem("favorites", JSON.stringify(favoritos));
    this.setState({ favoritos });
  };
  manejarDescripcion(id) {
    let visible;

    if (this.state.descripcionVisible.filter(item => item === id).length > 0) {
      
      visible = this.state.descripcionVisible.filter(item => item !== id);
    } else {
      
      visible = this.state.descripcionVisible.concat(id);
    }

    this.setState({ descripcionVisible: visible });
  }

  render() {
    const { movies, cargando, error, filter, favoritos } = this.state;

    if (cargando && movies.length === 0) {
      return <Loader />;
    }
    if (error) {
      return <NotFound />;
    }

    const moviesFiltradas = movies.filter((movie) => {
      if (filter === "") return true;
      if (!movie.title) return false;

      let titulo = movie.title.toLowerCase();
      let buscado = filter.toLowerCase();

      return titulo.includes(buscado);
    });


    return (
      <div className="container">
        <h2 className="alert alert-primary">
          {this.props.match.params.categoria === "popular"
            ? "Películas Populares"
            : "Todas las Películas"}
        </h2>

        <section className="row cards all-movies" id="movies">
          {moviesFiltradas.map((movie) => {
            const esFavorito = favoritos.find(f => f.id === movie.id && f.type === "movie");
            return (
              <article className="single-card-movie col-md-3 mb-4" key={movie.id}>
                <img
            className="card-img-top"
            src={
            movie.poster_path
             ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=Sin+imagen"
                }
                alt={movie.title ? movie.title : "Sin título"}
              />
<div className="card-body">
  <h5 className="card-title">{movie.title}</h5>
  
  {this.state.descripcionVisible.includes(movie.id) && (
    <p className="card-text">
      {movie.overview ? movie.overview : "Sin descripción."}
    </p>
  )}

  <button onClick={() => this.manejarDescripcion(movie.id)}>
    Ver descripción
  </button>

  <Link to={"/detail/movies/" + movie.id} className="btn-ver-mas">
    Ver más
  </Link>

                  {esFavorito ? (
                    <button
                      className="btn-favorito"
                      onClick={() => this.quitarDeFavoritos(movie.id)}
                    >
                      Sacar de Favoritos
                    </button>
                  ) : (
                    <button
                      className="btn-favorito"
                      onClick={() => this.agregarAFavoritos(movie)}
                    >
                      Agregar a Favoritos
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {movies.length > 0 && (
          <button className="btn-ver-todas" onClick={this.cargarMas}>
            Cargar más
          </button>
        )}
      </div>
    );
  }
}

export default Movies;
