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
      resultFilter: [],
      resultFilter4: [],
      loading: true,
      error: null,
      descripcionVisible: [],
      series: [],
    };
  }

  componentDidMount() {
    // Popular movies
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=2277889cc1ea5b292e88819d7f7e0ff2`)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        this.setState({ 
          popular: results, 
          resultFilter: results.filter((item, index) => index < 4) 
        });
      })
      .catch(err => this.setState({ error: err }));

    // Series
    fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=2277889cc1ea5b292e88819d7f7e0ff2`)
      .then(res => res.json())
      .then(data => {
        const results = data.results || [];
        this.setState({ 
          series: results, 
          resultFilter4: results.filter((item, index) => index < 4), 
          loading: false 
        });
      })
      .catch(err => this.setState({ error: err, loading: false }));
  }

  renderPoster(item) {
    if (item.poster_path) {
      return (
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title ? item.title: item.name ? item.name : "sin titulo"} // si no tiene titulo que el titulo sea el nombre y sino que diga sin titulo
        />
      );
    } else {
      return <NotFound />;
    }
  }

  manejarDescripcion(id) {
    let visible = [];

    // saco el id si ya estaba
    if (this.state.descripcionVisible.filter(item => item === id).length > 0) {
      visible = this.state.descripcionVisible.filter(item => item !== id);
    } 
    // si no estaba, lo agrego
    else {
      visible = [...this.state.descripcionVisible, id];
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
        <Header />

        <h2 className="section-title">Popular Movies</h2>
        <section className="cards">
          {this.state.resultFilter?.map(peli => (
            <article key={peli.id} className="single-card-movie">
              {this.renderPoster(peli)}
              <div className="cardBody">
                <h5>{peli.title}</h5>
                {this.state.descripcionVisible.filter(item => item === peli.id).length > 0 && (
                  <p className="card-text">{peli.overview}</p>
                )}
                <button onClick={() => this.manejarDescripcion(peli.id)}>
                  Ver descripción
                </button>
                <Link to={`/detail/movies/${peli.id}`}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
        <Link to="/movies/popular" className="btn-ver-todas">Ver todas</Link>

        <h2 className="section-title">Popular Seriies</h2>
        <section className="cards">
          {this.state.resultFilter?.map(item => (
            <article key={item.id} className="single-card-movie">
              {this.renderPoster(peli)}
              <div className="cardBody">
                <h5>{item.title}</h5>
                {this.state.descripcionVisible.filter(item => item === item.id).length > 0 && (
                  <p className="card-text">{peli.overview}</p>
                )}
                <button onClick={() => this.manejarDescripcion(item.id)}>
                  Ver descripción
                </button>
                <Link to={`/detail/series/${item.id}`}>Ir a detalle</Link>
              </div>
            </article>
          ))}
        </section>
        <Link to="/series/popular" className="btn-ver-todas">Ver todas</Link>
      </div>
    );
  }
}

export default Home;


 
