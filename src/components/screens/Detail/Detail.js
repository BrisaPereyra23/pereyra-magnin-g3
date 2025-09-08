import React, { Component } from "react";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      cargando: true,
      error: null,
      favorito: false, // manejamos favorito solo en el state
    };
  }

  componentDidMount() {
    const { id, tipo } = this.props.match.params; // viene de la ruta parametrizada

    fetch(
      `https://api.themoviedb.org/3/${tipo}/${id}?api_key=289ceab3aca6a2fae63aa3153d95ab4b&language=es-ES`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ item: data, cargando: false }))
      .catch((err) =>
        this.setState({ error: err.message, cargando: false })
      );
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

        {/* Detalle */}
        <h2 className="alert alert-primary">{item.title || item.name}</h2>

        <section className="row">
          <img
            className="col-md-6"
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
          />

          <section className="col-md-6 info">
            <h3>Descripción</h3>
            <p className="description">{item.overview}</p>

            <p className="mt-0 mb-0" id="release-date">
              <strong>Fecha de estreno:</strong>{" "}
              {item.release_date || item.first_air_date}
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
              <strong>Géneros:</strong>{" "}
              {item.genres && item.genres.map((g) => g.name).join(", ")}
            </p>

            <button
              className="btn btn-warning mt-2"
              onClick={this.manejarFavorito}
            >
              {favorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
            </button>
          </section>
        </section>
      </div>
    );
  }
}

export default Detail;
