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
      filter: ""
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }



  fetchMovies = () => {
    const categoryMap = {
      popular: "popular",
      "top-rated": "top-rated",
      upcoming: "upcoming",
      "now-playing": "now_playing"
      };
    const Categoria = this.props.match.params.categoria 
    const categoriaApi = this.categoryMap[Categoria]

    fetch(
      `https://api.themoviedb.org/3/movie/${categoriaApi}?language=en-US&page=${this.state.page}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          movies: data.results,
          cargando: false
        })
      )
      .catch((err) =>
        this.setState({ error: err.message, cargando: false })
      );
  };

  componentDidUpdate() {
    this.fetchMovies();
  }

  cargarMas = () => {
    this.setState(
      { page: this.state.page + 1, cargando: true },
      this.fetchMovies
    );
  };

  manejarFiltro = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const movies   = this.state.movies;
    const cargando = this.state.cargando;
    const error    = this.state.error;
    const filter   = this.state.filter;

    if (cargando && movies.length === 0) return <p>Cargando películas...</p>;
    if (error) return <p>Error: {error}</p>;

    // filtro dinámico con .filter() (de teoría)
    const moviesFiltradas = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="container">
       
        {/* Navbar 
        <nav>
          <ul className="nav nav-tabs my-4">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/movies">Películas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/series">Series</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/favoritos">Favoritas</a>
            </li>
          </ul>

          <form className="search-form" action="/results" method="get">
            <input type="text" name="searchData" placeholder="Buscar..." />
            <button type="submit" className="btn btn-success btn-sm">
              Buscar
            </button>
          </form>
        </nav>

        <h2 className="alert alert-primary">Todas las películas</h2>

         Filtro 
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
      <h2 className="alert alert-primary">
        Categoría: {this.props.match.params.categoria}
      </h2>

        {this.state.cargando ? (
      <p>Cargando películas...</p>) : (<>
      <section className="row cards all-movies" id="movies">
        {this.state.movies.map((movie) => (
          <article className="single-card-movie col-md-3 mb-4" key={movie.id}>
            <img className="card-img-top" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=Sin+imagen"}
              alt={movie.title}/>
            <div className="cardBody">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">
                {movie.overview ? movie.overview : "Sin descripción."}
              </p>
              <Link to={`/detail/movies/${movie.id}`} className="btn btn-primary"> Ver más </Link>
            </div>
          </article>
        ))}
      </section>

      <button className="btn btn-info" onClick={this.cargarMas}> Cargar más </button>
      </>
       )}
      </div>
    );
  }
}

export default Movies;
