import React, { Component } from "react";
import { Link } from "react-router-dom";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      mostrarDescripcion: {}, // objeto para manejar qué descripción está visible
    };
  }

  componentDidMount() {
    let favs = localStorage.getItem("favorites");
    if (favs !== null) {
      this.setState({
        favorites: JSON.parse(favs),
      });
    }
  }

  toggleDescripcion(id) {
    let nuevoEstado = {};
    // Copio lo que ya había
    for (let clave in this.state.mostrarDescripcion) {
      nuevoEstado[clave] = this.state.mostrarDescripcion[clave];
    }
    // Cambio solo el que corresponde
    nuevoEstado[id] = !nuevoEstado[id];
    this.setState({ mostrarDescripcion: nuevoEstado });
  }

  render() {
    return (
      <div className="favorites-page">
        <h2>Mis Favoritos</h2>

        {this.state.favorites.length === 0 ? (
          <p>No tenés favoritos guardados todavía.</p>
        ) : (
          <section className="row cards all-movies" id="movies">
            {this.state.favorites.map((fav) => {
              return (
                <article
                  key={fav.id}
                  className="single-card-movie col-md-3 mb-4"
                >
                <img
                    src={
                        fav.poster_path
                         ? "https://image.tmdb.org/t/p/w500" + fav.poster_path
                         : "https://via.placeholder.com/500x750?text=Sin+imagen"
                        }
                        alt={fav.title ? fav.title : fav.name}
                        />

                  <h3>{fav.title ? fav.title : fav.name}</h3>
                  <p>{fav.type === "movie" ? "Película" : "Serie"}</p>

                  {/* Botón ver descripción */}
                  <button
                    onClick={() => this.toggleDescripcion(fav.id)}
                    className="btn btn-info"
                  >
                    {this.state.mostrarDescripcion[fav.id]
                      ? "Ocultar descripción"
                      : "Ver descripción"}
                  </button>

                  {/* Descripción */}
                  {this.state.mostrarDescripcion[fav.id] && (
                    <p>{fav.overview}</p>
                  )}

                  {/* Botón ir a detalle */}
                  <Link
                    to={`/${fav.type}/${fav.id}`}
                    className="btn btn-primary"
                  >
                    Ir a detalle
                  </Link>

                  {/* Botón favorito (acá podrías hacer que lo saque de favoritos) */}
                  <button className="btn btn-warning">♥️</button>
                </article>
              );
            })}
          </section>
        )}
      </div>
    );
  }
}

export default Favorites;



        {/* Navbar 
      <img src="./img/Logo_Peliculas.png" className="peliculas-image" alt="logo" />
        
        <h2 className="alert alert-primary">Películas favoritas</h2>
        <section className="row cards" id="movies">
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">F1</h5>
                    <p className="card-text">Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling
                        Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.</p>
                    <a href="movie.js" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-info">♥️</a>
                </div>
            </article>
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">I Know What You Did Last Summer</h5>
                    <p className="card-text">When five friends inadvertently cause a deadly car accident, they cover up
                        their involvement and make a pact to keep it a secret rather than face the consequences. A year
                        later, their past comes back to haunt them and they're forced to confront a horrifying truth:
                        someone knows what they did last summer…and is hell-bent on revenge.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-info">♥️</a>
                </div>
            </article>
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Superman</h5>
                    <p className="card-text">Superman, a journalist in Metropolis, embarks on a journey to reconcile his
                        Kryptonian heritage with his human upbringing as Clark Kent.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-info">♥️</a>
                </div>
            </article>
        </section>

        <h2 className="alert alert-warning">Series favoritas</h2>
        <section className="row cards" id="tv-show">
            <article className="single-card-tv">
                <img src="https://image.tmdb.org/t/p/w500/9mYeRoWguq5etbwJRdF8BXFKiF.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">The Terminal List: Dark Wolf</h5>
                    <p className="card-text">Before The Terminal List, Navy SEAL Ben Edwards finds himself entangled in the
                        black operations side of the CIA. The deeper Ben goes into the 'gray', the harder it will become
                        to not give himself over to his darker impulses. Every man has two wolves inside him – light and
                        dark – fighting for control. Which wolf will Ben Edwards feed?</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-warning">♥️</a>
                </div>
            </article>
            <article className="single-card-tv">
                <img src="https://image.tmdb.org/t/p/w500/yueXS3q8BtoWekcHOATFHicLl3e.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Alien: Earth</h5>
                    <p className="card-text">When the mysterious deep space research vessel USCSS Maginot crash-lands on
                        Earth, Wendy and a ragtag group of tactical soldiers make a fateful discovery that puts them
                        face-to-face with the planet's greatest threat.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-warning">♥️</a>
                </div>
            </article>
            <article className="single-card-tv">
                <img src="https://image.tmdb.org/t/p/w500/yb4F1Oocq8GfQt6iIuAgYEBokhG.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Peacemaker</h5>
                    <p className="card-text">The continuing story of Peacemaker, a vainglorious superhero/supervillain who
                        believes in peace at any cost — no matter how many people he has to kill. After a miraculous
                        recovery from his duel with Bloodsport, Peacemaker soon discovers that his freedom comes at a
                        price.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-warning">♥️</a>
                </div>
            </article>
            

        </section> */}