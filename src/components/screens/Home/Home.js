import React, { Component } from "react";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import "./Home.css";
import NotFound from "../NotFound/NotFound";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [],
      topRated: [],
      upcoming: [],
      nowPlaying: [],
      resultFilter: [],
      resultFilter2: [],
      resultFilter3: [],
      resultFilter4: [],
      loading: true,
      error: null,
      descripcionVisible: [],
    };
  }

  componentDidMount() {
    const apiKey = "2277889cc1ea5b292e88819d7f7e0ff2";

    // Popular
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        this.setState({ 
          popular: results, 
          resultFilter: results.filter((peli, index) => index < 4) 
        });
      })
      .catch(err => this.setState({ error: err }));

    // Top Rated
    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        this.setState({ 
          topRated: results, 
          resultFilter2: results.filter((peli, index) => index < 4) 
        });
      })
      .catch(err => this.setState({ error: err }));

    // Upcoming
    fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        this.setState({ 
          upcoming: results, 
          resultFilter3: results.filter((peli, index) => index < 4) 
        });
      })
      .catch(err => this.setState({ error: err }));

    // Now Playing
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        this.setState({ 
          nowPlaying: results, 
          resultFilter4: results.filter((peli, index) => index < 4), 
          loading: false 
        });
      })
      .catch(err => this.setState({ error: err, loading: false }));
  }

  renderPoster(peli) {
    if (peli.poster_path) {
      return (
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${peli.poster_path}`}
          alt={peli.title}
        />
      );
    } else {
      return <NotFound />;
    }
  }

  manejarDescripcion(id) {
    let visible = [];
    let encontrado = false;

    for (let i = 0; i < this.state.descripcionVisible.length; i++) {
      if (this.state.descripcionVisible[i] === id) {
        encontrado = true;
      } else {
        visible.push(this.state.descripcionVisible[i]);
      }
    }

    if (!encontrado) {
      visible.push(id);
    }

    this.setState({ descripcionVisible: visible });
  }

  render() {
    if (this.state.loading) {
      return <p>Cargando...</p>;
    }

    if (this.state.error) {
      return <p>Error: {this.state.error.message}</p>;
    }

    return (
      <div className="container">
        <Header/>

        {/* Popular */}
        <h2 className="section-title">Popular Movies</h2>
        <section className="cards">
          {this.state.resultFilter?.map(peli => (
            <article key={peli.id} className="single-card-movie">
              {this.renderPoster(peli)}
              <div className="cardBody">
                <h5>{peli.title}</h5>
                {this.state.descripcionVisible.includes(peli.id) && <p className="card-text">{peli.overview}</p>}
                <button onClick={() => this.manejarDescripcion(peli.id)}>Ver descripción</button>
                <Link to={`/detail/movies/${peli.id}`}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
        <Link to="/movies/popular" className="btn-ver-todas">Ver todas</Link>

        {/* Top Rated */}
        <h2 className="section-title">Top Rated Movies</h2>
        <section className="cards">
          {this.state.resultFilter2?.map(peli => (
            <article key={peli.id} className="single-card-movie">
              {this.renderPoster(peli)}
              <div className="cardBody">
                <h5>{peli.title}</h5>
                {this.state.descripcionVisible.includes(peli.id) && <p className="card-text">{peli.overview}</p>}
                <button onClick={() => this.manejarDescripcion(peli.id)}>Ver descripción</button>
                <Link to={`/detail/movies/${peli.id}`}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
        <Link to="/movies/top-rated" className="btn-ver-todas">Ver todas</Link>

        {/* Upcoming */}
        <h2 className="section-title">Upcoming Movies</h2>
        <section className="cards">
          {this.state.resultFilter3?.map(peli => (
            <article key={peli.id} className="single-card-movie">
              {this.renderPoster(peli)}
              <div className="cardBody">
                <h5>{peli.title}</h5>
                {this.state.descripcionVisible.includes(peli.id) && <p className="card-text">{peli.overview}</p>}
                <button onClick={() => this.manejarDescripcion(peli.id)}>Ver descripción</button>
                <Link to={`/detail/movies/${peli.id}`}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
        <Link to="/movies/upcoming" className="btn-ver-todas">Ver todas</Link>

        {/* Now Playing */}
        <h2 className="section-title">Now Playing Movies</h2>
        <section className="cards">
          {this.state.resultFilter4?.map(peli => (
            <article key={peli.id} className="single-card-movie">
              {this.renderPoster(peli)}
              <div className="cardBody">
                <h5>{peli.title}</h5>
                {this.state.descripcionVisible.includes(peli.id) && <p className="card-text">{peli.overview}</p>}
                <button onClick={() => this.manejarDescripcion(peli.id)}>Ver descripción</button>
                <Link to={`/detail/movies/${peli.id}`}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
        <Link to="/movies/now-playing" className="btn-ver-todas">Ver todas</Link>
      </div>
    );
  }
}

export default Home;

 
