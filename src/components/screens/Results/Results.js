import React, { Component } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultadosMovies: [],
      resultadosSeries: [],
      cargando: true,
      error: null,
    };
  }

  componentDidMount() {
    const queryParam = this.props.match.params.query;
    const query = queryParam !== undefined && queryParam !== "" ? queryParam : "matrix";

    // Buscar películas
    fetch(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${query}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`)
      .then(res => res.json())
      .then(data => {
        this.setState({ resultadosMovies: data.results });
        // buscar series
        return fetch(`https://api.themoviedb.org/3/search/tv?language=en-US&query=${query}&api_key=2277889cc1ea5b292e88819d7f7e0ff2`);
      })
      .then(res => res.json())
      .then(data => {
        this.setState({ resultadosSeries: data.results, cargando: false });
      })
      .catch(err => this.setState({ error: err.message, cargando: false }));
  }

  renderCard(item, tipo) {
    const title = tipo === "movie" ? item.title : item.name;
    const descripcion = item.overview;
    const imagen = item.poster_path;
    const link = tipo === "movie" ? `/detail/movies/${item.id}` : `/detail/series/${item.id}`;

    return (
      <article className="single-card-movie" key={`${tipo}-${item.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${imagen}`}
          className="card-img-top"
          alt={title}
        />
        <div className="cardBody">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{descripcion}</p>
          <Link to={link} className="btn btn-primary">Ver más</Link>
          <button className="btn alert-info">♥️</button>
        </div>
      </article>
    );
  }

  render() {
    const resultadosMovies = this.state.resultadosMovies;
    const resultadosSeries = this.state.resultadosSeries;
    const cargando = this.state.cargando;
    const error = this.state.error;


    if (cargando) return <p>Buscando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="container">
        <Header/>
        <h2 className="alert alert-primary">Resultados de búsqueda - Movies</h2>
        <section className="row cards" id="movies">
          {resultadosMovies.map(movie => this.renderCard(movie, "movie"))}
        </section>

        <h2 className="alert alert-primary">Resultados de búsqueda - Series</h2>
        <section className="row cards" id="series">
          {resultadosSeries.map(serie => this.renderCard(serie, "series"))}
        </section>
        <Footer/>
      </div>
    );
  }
}

export default Results;
