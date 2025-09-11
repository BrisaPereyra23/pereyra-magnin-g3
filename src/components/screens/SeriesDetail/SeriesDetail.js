import React, { Component } from "react";

class SeriesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serie: null,
      cargando: true,
      error: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; 
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=es-ES&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`
    )
      .then((res) => res.json())
      .then((data) => this.setState({ serie: data, cargando: false }))
      .catch((err) => this.setState({ err, cargando: false }));
  }

  render() {
    const serie = this.state.serie;
    const cargando = this.state.cargando;
    const error = this.state.err;
    const imageUrl = series.image ? series.image : '/images/default-series.png';


    if (cargando) return <p>Cargando detalle...</p>;
    if (error) return <p>Error: {err}</p>;

    return (
      <div className="container">
        <h2 className="alert alert-warning">{serie.name}</h2>
        <section className="row">
          <img
            className="col-md-6"
            src={imageUrl} alt={series.name}
          />{/*ver si esta bien la imagen */}
          {/*chequear esto */}
          <section className="col-md-6 info">
            <h3>Información</h3>
            <p><strong>Nombre en mayúsculas:</strong> {serie.name.toUpperCase()}</p>
            <p><strong>ID de la serie:</strong> {serie.id}</p>
        </section>
        </section>
      </div>
    );
  }
}

export default SeriesDetail;


