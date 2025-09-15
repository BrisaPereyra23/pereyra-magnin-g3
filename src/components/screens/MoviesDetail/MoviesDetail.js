//2277889cc1ea5b292e88819d7f7e0ff2

import React, { Component } from "react";

class MoviesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      cargando: true,
      error: null,
      favorito: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=es-ES&api_key=2277889cc1ea5b292e88819d7f7e0ff2`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ movie: data, cargando: false }))
      .catch((err) => this.setState({ error: err, cargando: false }));
  }
  render() {
    const movie = this.state.movie;
    const cargando = this.state.cargando;
    const error = this.state.error;

    if (cargando) return <p>Cargando detalle...</p>;
    if (error) return <p>Error: {error.message}</p>;

    let imageUrl = "/images/default-movie.png";
    if (movie.poster_path) {
      imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    }
// no se como hacer el coso de generos
    return (
      <div className="container">
        <h2>{movie.title}</h2>
        <img className="poster-img" src={imageUrl} alt={movie.title} />

        <p><strong>Calificación:</strong> {movie.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
        <p><strong>Duración:</strong> {movie.runtime} min</p>
        <p><strong>Sinópsis:</strong> {movie.overview}</p>
        <p><strong>Géneros:</strong>
        
        </p>
        
        
      </div>
    );
  }
}

export default MoviesDetail;
