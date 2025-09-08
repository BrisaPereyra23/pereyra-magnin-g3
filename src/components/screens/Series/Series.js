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
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`)
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
