import React, { Component } from "react";
import { Link } from "react-router-dom";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      cargando: true,
      error: null,
      page: 1,
      filter: ""
    };
  }

  componentDidMount() {
    this.fetchSeries();
  }

  fetchSeries = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/popular?language=es-ES&page=${this.state.page}&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
           series: data.results, 
           cargando: false
        })
      )
      .catch((err) => this.setState({ err, cargando: false })
      );
  };
/*ver de aca */
  cargarMas = () => {
    this.setState(
      { page: this.state.page + 1, cargando: true },
      this.fetchSeries
    );
  };

  manejarFiltro = (e) => {
    this.setState({ filter: e.target.value });
  };
/*a aca */
  render() {
    const series = this.state.series;
    const cargando = this.state.cargando;
    const error = this.state.err;
    const filter = this.state.filter;

    if (cargando && series.length === 0) 
      return <p>Cargando series...</p>;
    if (error) 
      return <p>Error: {err}</p>;

    const seriesFiltradas = series.filter((show) =>
      show.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="container">
        <h1>Series Populares</h1>

        <form className="filter-form px-0 mb-3">
          <input
            type="text"
            name="filter"
            placeholder="Buscar dentro de la lista"
            value={filter}
            onChange={this.manejarFiltro}
          />
        </form>

        <section className="row cards all-series" id="series">
          {seriesFiltradas.map((show) => (
            <article className="single-card-serie col-md-3 mb-4" key={show.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                className="card-img-top"
                alt={show.name}
              />
              <div className="cardBody">
                <h5 className="card-title">{show.name}</h5>
                <p className="card-text">
                  {show.name.toUpperCase()}
                </p>
                <Link to={`/detail/tv/${show.id}`} className="btn btn-primary">
                  Ver más
                </Link>
              </div>
            </article>
          ))}
        </section>

        <button className="btn btn-info" onClick={this.cargarMas}>
          Cargar más
        </button>
      </div>
    );
  }
}

export default Series;
