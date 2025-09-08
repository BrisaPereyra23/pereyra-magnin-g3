import React, { Component } from "react";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      cargando: true,
      error: null,
      favorito: false,
    };
  }

  componentDidMount() {
    const { id, tipo } = this.props.match.params;

    fetch(
      `https://api.themoviedb.org/3/${tipo}/${id}?language=en-US&page=&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ item: data, cargando: false }))
      .catch((err) => this.setState({ error: err.message, cargando: false }));
  }

  manejarFavorito = () => {
    this.setState({ favorito: !this.state.favorito });
  };

  render() {
    const { item, cargando, error, favorito } = this.state;

    if (cargando) return <p>Cargando detalle...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!item) return null;

    return (
      <div className="container">
        <h1>UdeSA Movies</h1>

        {/* Navbar */}
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/favorites">Favorites</a>
          <a href="/movies">Movies</a>
          <a href="/tv">TV Shows</a>
        </nav>

        {/* Detalle */}
        <h2 className="alert alert-primary mt-3">{item.title || item.name}</h2>

        <section className="row cards">
          <img
            className="col-md-6 peliculas-image"
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
          />

          <section className="col-md-6 cardBody">
            <h3>Descripción</h3>
            <p className="description">{item.overview}</p>

            <p className="mt-0 mb-0" id="release-date">
              <strong>Fecha de estreno:</strong> {item.release_date || item.first_air_date}
            </p>

            <p className="mt-0 mb-0 length">
              <strong>Duración:</strong>{" "}
              {item.runtime
                ? `${item.runtime} min`
                : item.number_of_seasons
                ? `${item.number_of_seasons} temporadas`
                : "N/D"}
            </p>

            <p className="mt-0" id="votes">
              <strong>Puntuación:</strong> {item.vote_average}
            </p>

            <p>
              <strong>Géneros:</strong> {item.genres && item.genres.map((g) => g.name).join(", ")}
            </p>

            <button className="btn btn-warning mt-2" onClick={this.manejarFavorito}>
              {favorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
            </button>
          </section>
        </section>
      </div>
    );
  }
}

export default Detail;
