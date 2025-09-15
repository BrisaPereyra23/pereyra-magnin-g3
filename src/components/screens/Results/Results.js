import React, { Component } from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultadosMovies: [],
      resultadosSeries: [],
      cargando: true,
      error: null,
      tipoBusqueda: this.props.match.params.query,
    };
  }

  componentDidMount() {
    const queryParam = this.props.match.params.query;
    const query = queryParam !== undefined && queryParam !== "" ? queryParam : "matrix";

    this.setState({ cargando: true });

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
    const { resultadosMovies, resultadosSeries, cargando, error, tipoBusqueda } = this.state;

    if (cargando) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
      <div className="container">
        <Header/>
        <h2 className="alert alert-secondary">Búsqueda de: {tipoBusqueda}</h2>

        <h3 className="alert alert-primary">Resultados - Movies</h3>
        <section className="row cards" id="movies">
          {resultadosMovies.map(movie => this.renderCard(movie, "movie"))}
        </section>

        <h3 className="alert alert-primary">Resultados - Series</h3>
        <section className="row cards" id="series">
          {resultadosSeries.map(serie => this.renderCard(serie, "series"))}
        </section>

        
      </div>
    );
  }
}

export default Results;
//2277889cc1ea5b292e88819d7f7e0ff2