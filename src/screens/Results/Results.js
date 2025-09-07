import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      cargando: true,
      error: null
    };
  }

  componentDidMount() {
    // Supongamos que la query viene por params: /results/:query
    const query = this.props.match.params.query || "matrix";

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=289ceab3aca6a2fae63aa3153d95ab4b&language=es-ES&query=${query}`)
      .then(res => res.json())
      .then(data => this.setState({ resultados: data.results, cargando: false }))
      .catch(err => this.setState({ error: err.message, cargando: false }));
  }

  render() {
    if (this.state.cargando) return <p>Buscando...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;

    return (
      <div>
        <h1>Resultados</h1>
        <ul>
          {this.state.resultados.map(r => (
            <li key={r.id}>{r.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Results;
