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
      categoriaActual: this.props.match.params.categoria,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  componentDidUpdate() {
    if (this.props.match.params.categoria !== this.state.categoriaActual) {
      this.setState(
        {
          movies: [],
          cargando: true,
          error: null,
          page: 1,
          filter: "",
          categoriaActual: this.props.match.params.categoria,
        },
        () => this.fetchMovies()
      );
    }
  }

  fetchMovies = () => {
    const categoryMap = {
      popular: "popular",
      "top-rated": "top_rated",
      upcoming: "upcoming",
      "now-playing": "now_playing",
    };

    const categoria = this.props.match.params.categoria;
    let url = "";

    if (categoria !== undefined && categoryMap[categoria] !== undefined) {
      url =
        `https://api.themoviedb.org/3/movie/${categoryMap[categoria]}?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`
    } else if (categoria === undefined) {
      url =
        `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`
    } else {
      this.setState({ error: "Categoría no válida", cargando: false });
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
          
          for (let i = 0; i < this.state.movies.length; i++) {
            nuevas.push(this.state.movies[i]);
          }
          
          for (let j = 0; j < resultados.length; j++) {
            nuevas.push(resultados[j]);
          }
        }

        this.setState({
          movies: nuevas,
          cargando: false,
        });
      })
      .catch((err) =>
        this.setState({
          error: err.message ? err.message : "Error al cargar",
          cargando: false,
        })
      );
  };

  cargarMas = () => {
    this.setState(
      { page: this.state.page + 1, cargando: true }, () => this.fetchMovies()
    );
  };

  manejarFiltro = (event) => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const movies = this.state.movies;
    const cargando = this.state.cargando;
    const error = this.state.error;
    const filter = this.state.filter;


    if (cargando && movies.length === 0) {
      return <p>Cargando películas...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }

    const moviesFiltradas = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="container">
        <h2 className="alert alert-primary">
          {this.props.match.params.categoria !== undefined
          ? `Categoría: ${this.props.match.params.categoria}`
          : "Todas las películas"}
        </h2>

        {/* Filtro 
        <form className="filter-form px-0 mb-3">
          <input
            type="text"
            name="filter"
            placeholder="Buscar dentro de la lista"
            value={filter}
            onChange={this.manejarFiltro}
          />
        </form>*/}

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
                  to={"/detail/movies/" + movie.id}
                  className="btn btn-primary"
                >
                  Ver más
                </Link>
              </div>
            </article>
          ))}
        </section>

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
