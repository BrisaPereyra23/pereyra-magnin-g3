//2277889cc1ea5b292e88819d7f7e0ff2

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import NavBar from "../../Navbar/Navbar";
import "./SeriesDetail.css";
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
    const serie = this.state.serie;
    const cargando = this.state.cargando;
    const error = this.state.error

    if (cargando) return <Loader />;
    if (error) return <NotFound />;

    let imageUrl = "/images/default-movie.png";
    if (serie.poster_path) {
      imageUrl = "https://image.tmdb.org/t/p/w500" + serie.poster_path;
    }

    return (
      <div className="container">
        <section className="header-section">
        <img src="/img/Logo_Peliculas.png" className="peliculas-image" alt="logo" />
        <h1 className="site-title">Popcorn Studio</h1>
        </section>
          <NavBar />
        <h2 className="nombreDetail">{serie.name}</h2>
        <img className="poster-img" src={imageUrl} alt={serie.name} />
        <p><strong>Calificación:</strong> {serie.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {serie.release_date}</p>
        <p><strong>Sinópsis:</strong> {serie.overview}</p>
        <p><strong>Géneros:</strong> {" "}
        {serie.genres.map((g, i) => (
        <span key={g.id}>{g.name}{i < serie.genres.length - 1 ? ", " : ""}</span>
        ))}</p>
      </div>
    );
  }
}

export default SeriesDetail;