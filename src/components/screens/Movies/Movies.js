import React, { Component } from "react";
import { Link } from "react-router-dom";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cargando: true,
      error: null,
      page: 1,
      filter: "",
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const categoriaActual = this.props.match.params.categoria;
    const paginaActual = this.state.page;

    // Solo llamar fetchMovies si cambió la categoría o la página
    if (
      categoriaActual !== prevProps.match.params.categoria ||
      paginaActual !== prevState.page
    ) {
      this.fetchMovies();
    }
  }

  fetchMovies = () => {
    const categoryMap = {
      popular: "popular",
      "top-rated": "top_rated",
      upcoming: "upcoming",
      "now-playing": "now_playing",
    };

    const Categoria = this.props.match.params.categoria;
    const categoriaApi = categoryMap[Categoria]; // ⚡ Usar la variable local, no this.categoryMap

    if (!categoriaApi) {
      this.setState({ error: "Categoría no válida", cargando: false });
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/movie/${categoriaApi}?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`
    )
      .then((res) => res.json())
      .then((data) => {
        const resultados = data.results || [];
        // Si es página 1, reemplaza; si es >1, concatena para "Cargar más"
        this.setState((prevState) => ({
          movies:
            this.state.page === 1
              ? resultados
              : [...prevState.movies, ...resultados],
          cargando: false,
        }));
      })
      .catch((err) =>
        this.setState({ error: err.message || "Error al cargar", cargando: false })
      );
  };

  cargarMas = () => {
    this.setState({ page: this.state.page + 1, cargando: true });
  };

  manejarFiltro = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { movies, cargando, error, filter } = this.state;

    if (cargando && movies.length === 0) return <p>Cargando películas...</p>;
    if (error) return <p>Error: {error}</p>;

    const moviesFiltradas = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="container">
        <h2 className="alert alert-primary">
          Categoría: {this.props.match.params.categoria}
        </h2>

        {/* Filtro */}
        <form className="filter-form px-0 mb-3">
          <input
            type="text"
            name="filter"
            placeholder="Buscar dentro de la lista"
            value={filter}
            onChange={this.manejarFiltro}
          />
        </form>

        {/* Cards de películas */}
        <section className="row cards all-movies" id="movies">
          {moviesFiltradas.map((movie) => (
            <article className="single-card-movie col-md-3 mb-4" key={movie.id}>
              <img
                className="card-img-top"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=Sin+imagen"
                }
                alt={movie.title}
              />
              <div className="cardBody">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  {movie.overview ? movie.overview : "Sin descripción."}
                </p>
                <Link
                  to={`/detail/movies/${movie.id}`}
                  className="btn btn-primary"
                >
                  Ver más
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Botón cargar más */}
        {movies.length > 0 && (
          <button className="btn btn-info" onClick={this.cargarMas}>
            Cargar más
          </button>
        )}
      </div>
    );
  }
}

export default Movies;
