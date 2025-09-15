import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Loader from "../../Loader/Loader";
import "./Movies.css"; // asegurate que el CSS esté en la misma carpeta o ajustá la ruta

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cargando: true,
      error: null,
      page: 1,
      filter: ""
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    const { categoria } = this.props.match.params;
    let url = "";

    if (categoria === "popular" || categoria === undefined) {
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else {
      this.props.history.push("/NotFound");
      return;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const resultados = data && data.results ? data.results : [];
        const nuevas = this.state.page === 1 ? resultados : [...this.state.movies, ...resultados];

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
      (prev) => ({ page: prev.page + 1, cargando: true }),
      () => this.fetchMovies()
    );
  };

  manejarFiltro = (event) => {
    this.setState({ filter: event.target.value });
  };

  agregarAFavoritos = (id) => {
    const favoritosStorage = localStorage.getItem("favoritos");
    const favoritos = favoritosStorage ? JSON.parse(favoritosStorage) : [];
    if (!favoritos.includes(id)) favoritos.push(id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    this.forceUpdate(); // para re-renderizar y ver el cambio
  };

  quitarDeFavoritos = (id) => {
    const favoritosStorage = localStorage.getItem("favoritos");
    const favoritos = favoritosStorage ? JSON.parse(favoritosStorage) : [];
    const nuevos = favoritos.filter((favId) => favId !== id);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
    this.forceUpdate();
  };

  render() {
    const { movies, cargando, error, filter } = this.state;

    if (cargando && movies.length === 0) return <Loader />;
    if (error) return <NotFound />;

    const moviesFiltradas = movies.filter((movie) => {
      if (!filter) return true;
      if (!movie.title) return false;
      return movie.title.toLowerCase().includes(filter.toLowerCase());
    });

    const favoritos = localStorage.getItem("favoritos")
      ? JSON.parse(localStorage.getItem("favoritos"))
      : [];

    return (
      <div className="container">
        <h2 className="alert alert-primary">
          {this.props.match.params.categoria === "popular"
            ? "Películas Populares"
            : "Todas las Películas"}
        </h2>

        <section className="row cards all-movies" id="movies">
          {moviesFiltradas.map((movie) => {
            const esFav = favoritos.includes(movie.id);
            return (
              <article className="single-card-movie col-md-3 mb-4" key={movie.id}>
                <img
                  className="card-img-top"
                  src={
                    movie.poster_path
                      ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                      : "https://via.placeholder.com/500x750?text=Sin+imagen"
                  }
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    {movie.overview ? movie.overview : "Sin descripción."}
                  </p>

                  <Link to={"/detail/movies/" + movie.id} className="btn-ver-mas">
                    Ver más
                  </Link>

                  {esFav ? (
                    <button className="btn-favorito" onClick={() => this.quitarDeFavoritos(movie.id)}>
                      Sacar de Favoritos
                    </button>
                  ) : (
                    <button className="btn-favorito" onClick={() => this.agregarAFavoritos(movie.id)}>
                      Agregar a favoritos
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
