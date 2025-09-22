import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import "./Favorites.css";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      descripcionVisible: [], 
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

  manejarDescripcion(id) {
  let visible = this.state.descripcionVisible;

  if (visible.includes(id)) { 
    visible = visible.filter(function (item) {
      return item !== id;
    });
  } else {
    let nuevo = [];
    visible.map(function (item) {
      nuevo.push(item);
    });
    nuevo.push(id);
    visible = nuevo;
  }

  this.setState({ descripcionVisible: visible });
}


  render() {
    return (
      <div className="container">
        <section className="header-section">
        <img src="/img/Logo_Peliculas.png" className="peliculas-image" alt="logo" />
        <h1 className="site-title">Popcorn Studio</h1>
        </section>
        <Navbar />
        <h2 className="Fav">Mis Favoritos</h2>
        {this.state.favorites.length === 0 ? (
          <p>No tenés favoritos guardados todavía.</p>
        ) : (
          <section className="row cards all-movies" id="movies">
            {this.state.favorites.map((fav) => {
              let descripcionActiva = this.state.descripcionVisible.includes(fav.id);
              return (
                <article
                  key={fav.id}
                  className="single-card-movie col-md-3 mb-4"
                >
                  <img
                    className="card-img"
                    src={
                      fav.poster_path
                        ? `https://image.tmdb.org/t/p/w500${fav.poster_path}`
                        : `https://via.placeholder.com/500x750?text=Sin+imagen`
                    }
                    alt={fav.title ? fav.title : fav.name}
                  />

                  <h3>{fav.title ? fav.title : fav.name}</h3>
                  <p>{fav.type === "movie" ? "Película" : "Serie"}</p>

                  <button
                    onClick={() => this.manejarDescripcion(fav.id)}
                    className="btn btn-info"
                  >
                    {descripcionActiva ? "Ocultar descripción" : "Ver descripción"}
                  </button>

                  {descripcionActiva && <p>{fav.overview}</p>}

                 <Link 
                 to={`/detail/${fav.type === "movie" ? "movies" : "series"}/${fav.id}`} 
                 className="btn btn-primary">Ir a detalle</Link>

                  <button className="btn btn-warning">✔️</button>
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
