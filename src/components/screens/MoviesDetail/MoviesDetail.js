
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import NavBar from "../../Navbar/Navbar";

import "./MovieDetail.css";
class MoviesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      cargando: true,
      error: null,
      favorito: false, 
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
  const { movie, cargando, error } = this.state;

  if (cargando) return <Loader />;
  if (error) return <NotFound />;
  

  let imageUrl = "/images/default-movie.png";
  if (movie.poster_path) {
    imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }

  return (
    <div className="container">
      <section className="header-section">
        <img src="/img/Logo_Peliculas.png" className="peliculas-image" alt="logo" />
        <h1 className="site-title">Popcorn Studio</h1>
        </section>
      <NavBar />
      <h2 className="nombreDetail">{movie.title}</h2>
      <img className="poster-img" src={imageUrl} alt={movie.title} />

      <p><strong>Calificación:</strong> {movie.vote_average}</p>
      <p><strong>Fecha de estreno:</strong> {movie.release_date}</p>
      <p><strong>Duración:</strong> {movie.runtime} min</p>
      <p><strong>Sinópsis:</strong> {movie.overview}</p>
      
      {movie.genres && ( 
        <p>
          <strong>Géneros:</strong>{" "}
          {movie.genres.map((g, i) => (
            <span key={g.id}>
              {g.name}
              {i < movie.genres.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      )}

    
    </div>
  );
}

    
  
}

export default MoviesDetail;
