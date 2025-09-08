import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      cargando: true,
      error: null
    };
  }

  componentDidMount() {
    const query = this.props.match.params.query || "matrix";

    fetch(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI `
)
      .then(res => res.json())
      .then(data => this.setState({ resultados: data.results, cargando: false }))
      .catch(err => this.setState({ error: err.message, cargando: false }));
  }

  render() {
    const { resultados, cargando, error } = this.state;

    if (cargando) return <p>Buscando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="container">
        <h1>UdeSA Movies</h1>

        <nav>
          <ul className="nav nav-tabs my-4">
            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/movies">Películas</a></li>
            <li className="nav-item"><a className="nav-link" href="/series">Series</a></li>
            <li className="nav-item"><a className="nav-link" href="/favorites">Favoritas</a></li>
          </ul>

          <form className="search-form" action="/results" method="get">
            <input type="text" name="searchData" placeholder="Buscar..." className="" />
            <button type="submit" className="btn btn-success btn-sm">Buscar</button>
          </form>
        </nav>

        <h2 className="alert alert-primary">Resultados de búsqueda</h2>
        <section className="row cards" id="movies">
          {resultados.map(movie => (
            <article className="single-card-movie" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="cardBody">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview}</p>
                <a href={`/movie/${movie.id}`} className="btn btn-primary">Ver más</a>
                <button className="btn alert-info">♥️</button>
              </div>
            </article>
          ))}
        </section>
      </div>
    );
  }
}

export default Results;
