import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      cargando: true,
      error: null
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/tv/popular?api_key=289ceab3aca6a2fae63aa3153d95ab4b&language=es-ES&page=1")
      .then(res => res.json())
      .then(data => this.setState({ series: data.results, cargando: false }))
      .catch(err => this.setState({ error: err.message, cargando: false }));
  }

  render() {
    if (this.state.cargando) return <p>Cargando series...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;

    return (
      <div>
        <h1>Series Populares</h1>
        <ul>
          {this.state.series.map(show => (
            <li key={show.id}>
              <Link to={`/detail/${show.id}`}>{show.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Series;
