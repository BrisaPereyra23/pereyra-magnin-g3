import React, { Component } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";


class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      cargando: true,
      error: null,
    };
  }

  componentDidMount() {
    const query = this.props.match.params.query || "matrix";

    fetch(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`
)
      .then(res => res.json())
      .then(data => this.setState({ resultados: data.results, cargando: false }))
      .catch(err => this.setState({ error: err.message, cargando: false }));
  }

  render() {
    const { resultados, cargando, error } = this.state;

    if (cargando) return <p>Buscando...</p>;  // aca deberia ir un loader pero falta la clase creo
    if (error) return <p>Error: {error}</p>; // aca deberia ir un componente de error el d 404? 

    return (
      <div className="container">
        <Header/>
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
        <Footer/>
      </div>
    );
  }
}

export default Results;
