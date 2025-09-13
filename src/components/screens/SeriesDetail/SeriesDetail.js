//2277889cc1ea5b292e88819d7f7e0ff2
import React, { Component } from "react";

class SeriesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: null,
      cargando: true,
      error: null,
      favorito: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=es-ES&api_key=2277889cc1ea5b292e88819d7f7e0ff2`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ serie: data, cargando: false }))
      .catch((err) => this.setState({ error: err, cargando: false }));
  }

  render() {
    const { serie, cargando, error } = this.state;

    if (cargando) return <p>Cargando detalle...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Imagen
    const imageUrl = serie.poster_path
      ? "https://image.tmdb.org/t/p/w500" + serie.poster_path
      : "/images/default-series.png";

    //  Armamos la lista de géneros de manera simple no c q onda esto
    let listaGeneros = <li>No hay géneros disponibles</li>;
    if (serie.genres && serie.genres.length > 0) {
      listaGeneros = serie.genres.map((g) => (
        <li key={g.id}>{g.name}</li>
      ));
    }

    return (
      <div className="container">
        <h2>{serie.name}</h2>
        <img className="poster-img" src={imageUrl} alt={serie.name} />

        <p><strong>Calificación:</strong> {serie.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {serie.first_air_date}</p>
        <p><strong>Sinópsis:</strong> {serie.overview}</p>

        <h4>Géneros:</h4>
        <ul>{listaGeneros}</ul>
      </div>
    );
  }
}

export default SeriesDetail;
// no se como hacer el coso de generos
//<button onClick={this.toggleFavorito}>
//          {favorito ? "Quitar de Favoritos" : "Agregar a Favoritos"}
//        //</button>}