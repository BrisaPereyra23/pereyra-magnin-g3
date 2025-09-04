import React from "react";

function MovieDetail() {
    return(
         <div class="container">
        <h1>UdeSA Movies</h1>

        
        <nav>
            <ul class="nav nav-tabs my-4">
                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="movies.html">Películas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="series.html">Series</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="favorites.html">Favoritas</a>
                </li>
            </ul>
            
            <form class="search-form" action="results.html" method="get">
                <input type="text" class="" name="searchData" placeholder="Buscar..." value=""/>
                <button type="submit" class="btn btn-success btn-sm">Buscar</button>
            </form>
        </nav>

        <h2 class="alert alert-primary">Superman</h2>
        <section class="row">
            <img class="col-md-6" src="https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg" alt=""/>
            <section class="col-md-6 info">
                <h3>Descripción</h3>
                <p class="description">Superman, a journalist in Metropolis, embarks on a journey to reconcile his
                    Kryptonian heritage with his human upbringing as Clark Kent.</p>
                <p class="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> 2025-07-09</p>
                <p class="mt-0 mb-0 length"><strong>Duración:</strong> 130</p>
                <p class="mt-0" id="votes"><strong>Puntuación:</strong> 7.534</p>
            </section>
        </section>
        </div>
    )
}
export default MovieDetail