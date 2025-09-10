import React, { Component } from "react";
import Header from "../../Header/Header";
import Formulario from "../../Formulario/Formulario";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [],
      topRated: [],
      upcoming: [],
      nowPlaying: [],
      loading: true
    };
  }

  componentDidMount() {
    // Popular
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`)
      .then(res => res.json())
      .then(data => this.setState({ popular: data.results }))
      .catch(err => console.error(err));

    // Top Rated
    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`)
      .then(res => res.json())
      .then(data => this.setState({ topRated: data.results }))
      .catch(err => console.error(err));

    // Upcoming
    fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`)
      .then(res => res.json())
      .then(data => this.setState({ upcoming: data.results }))
      .catch(err => console.error(err));

    // Now Playing
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODljZWFiM2FjYTZhMmZhZTYzYWEzMTUzZDk1YWI0YiIsIm5iZiI6MTc1NzI1NjE1MC44OTEsInN1YiI6IjY4YmQ5OWQ2YjRiM2JiYjczYjliYzIyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hn2Sy_eCyWgGOCC7J-_Mo0__KiLW-6hq_rrR54C6gzI`)
      .then(res => res.json())
      .then(data => this.setState({ nowPlaying: data.results, loading: false }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.loading) {
      return <p>Cargando...</p>;  //aca deberia ir un loader pero falta la clase creo
    }

    return (
      <div className="container">
       <Header/>
       <Formulario/>
        {/* Popular */}
        <h2 className="section-title">Popular Movies</h2>
        <section className="cards">
          {this.state.popular.map(peli => (
            <article key={peli.id} className="single-card-movie">
              <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} alt={peli.title} />
              <div className="cardBody">
                <h5>{peli.title}</h5>
                <p className="card-text">{peli.overview}</p>
              </div>
            </article>
           
          ))}
        </section>
           <Link to="/movies" className="btn-ver-todas">
          Ver todas
        </Link>

        {/* Top Rated */}
        <h2 className="section-title">Top Rated Movies</h2>
        <section className="cards">
          {this.state.topRated.map(peli => (
            <article key={peli.id} className="single-card-movie">
              <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} alt={peli.title} />
              <div className="cardBody">
                <h5>{peli.title}</h5>
                <p className="card-text">{peli.overview}</p>
              </div>
            </article>
          ))}
        </section>
           <Link to="/movies" className="btn-ver-todas">
          Ver todas
        </Link>

        {/* Upcoming */}
        <h2 className="section-title">Upcoming Movies</h2>
        <section className="cards">
          {this.state.upcoming.map(peli => (
            <article key={peli.id} className="single-card-movie">
              <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} alt={peli.title} />
              <div className="cardBody">
                <h5>{peli.title}</h5>
                <p className="card-text">{peli.overview}</p>
              </div>
            </article>
          ))}
        </section>
           <Link to="/movies" className="btn-ver-todas">
          Ver todas
        </Link>
        {/* Now Playing */}
        <h2 className="section-title">Now Playing Movies</h2>
        <section className="cards">
          {this.state.nowPlaying.map(peli => (
            <article key={peli.id} className="single-card-movie">
              <img src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`} alt={peli.title} />
              <div className="cardBody">
                <h5>{peli.title}</h5>
                <p className="card-text">{peli.overview}</p>
              </div>
            </article>
          ))}
        </section>
         <Link to="/movies" className="btn-ver-todas">
          Ver todas
        </Link>
      </div>
    );
  }
}

export default Home;
//revisar teoria pero creo que es coherente okay hay que poner el header que tiene el navbar adentro
// aca no deberia de ir el loader? onda si el loeader true que muestre el loader y si no que muestre el contenido no?
// ah le agregue el boton ver todas no c si se hace asi pero bueno