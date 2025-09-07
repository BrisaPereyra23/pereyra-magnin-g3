import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cargando: true,
      error: null
    };
  }

  componentDidMount() {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=289ceab3aca6a2fae63aa3153d95ab4b&language=es-ES&page=1")
      .then(res => res.json())
      .then(data => this.setState({ movies: data.results, cargando: false }))
      .catch(err => this.setState({ error: err.message, cargando: false }));
  }

  render() {
    if (this.state.cargando) return <p>Cargando películas...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;

    return (
      <div>
        <h1>Películas Populares</h1>
        <ul>
          {this.state.movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/detail/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Movies;
