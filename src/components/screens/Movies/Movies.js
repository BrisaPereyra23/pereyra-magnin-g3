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

  fetchMovies = () => {
    const { categoria } = this.props.match.params;
    let url = "";

    if (categoria === "popular") {
      
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else if (categoria === undefined) {
   
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`;
    } else {
    
      this.props.history.push("/NotFound"); //fijarse si esta bien o va con link
      return;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let resultados = [];
        if (data && data.results) {
          resultados = data.results;
        }

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

  render() {
    const movies = this.state.movies;
    const cargando = this.state.cargando;
    const error = this.state.error;
    const filter = this.state.filter;

    if (cargando && movies.length === 0) {
      return <p>Cargando películas...</p>;
    }
    if (error) {
      return <p>Error: {error.message ? error.message : "Error al cargar"}</p>;
    }

    const moviesFiltradas = movies.filter(function (movie) {
  if (filter === "") {
    return true; // si no hay filtro, muestro todas
  }
  if (movie.title) {
    let titulo = movie.title.toLowerCase();
    let buscado = filter.toLowerCase();

    for (let i = 0; i <= titulo.length - buscado.length; i++) {
      let iguales = true;
      for (let j = 0; j < buscado.length; j++) {
        if (titulo[i + j] !== buscado[j]) {
          iguales = false;
        }
      }
      if (iguales) {
        return true;
      }
    }
  }
  return false;
});

    return (
      <div className="container">
        <h2 className="alert alert-primary">
          {this.props.match.params.categoria === "popular"
            ? "Películas Populares"
            : "Todas las Películas"}
        </h2>

        <section className="row cards all-movies" id="movies">
          {moviesFiltradas.map((movie) => (
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
