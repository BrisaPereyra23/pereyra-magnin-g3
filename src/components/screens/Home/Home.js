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
        let results;
        if (data.results === undefined) {
          results = [];
        } else {
          results = data.results;
        }

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
        let results;
        if (data.results === undefined) {
          results = [];
        } else {
          results = data.results;
        }

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
      let altText;
      if (item.title !== undefined) {
        altText = item.title;
      } else if (item.name !== undefined) {
        altText = item.name;
      } else {
        altText = "sin titulo";
      }

      return (
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={altText}
        />
      );
    } else {
      return <NotFound />;
    }
  }

  manejarDescripcion(id) {
    let visible;

    if (this.state.descripcionVisible.filter(item => item === id).length > 0) {
      
      visible = this.state.descripcionVisible.filter(item => item !== id);
    } else {
      
      visible = this.state.descripcionVisible.concat(id);
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
          {this.state.resultFilter.map(peli => (
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

        <h2 className="section-title">Popular Series</h2>
        <section className="cards"> 
          {this.state.resultFilter4.map(serie => (
            <article key={serie.id} className="single-card-movie">
              {this.renderPoster(serie)} 
              <div className="cardBody">
                <h5>{serie.name}</h5>
                {this.state.descripcionVisible.filter(item => item === serie.id).length > 0 && (
                  <p className="card-text">{serie.overview}</p>
                )}
                <button onClick={() => this.manejarDescripcion(serie.id)}>
                  Ver descripción
                </button>
                <Link to={`/detail/series/${serie.id}`}>Ir a detalle</Link>
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
