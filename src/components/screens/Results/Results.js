import React, { Component } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Formulario from "../../Formulario/Formulario";
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

    fetch(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI `
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
        <Formulario/>
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
