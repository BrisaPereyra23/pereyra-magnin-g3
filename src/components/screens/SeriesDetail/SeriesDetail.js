import React from "react"

function SeriesDetail() {
    return (
        <>
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

        <h2 class="alert alert-warning">The Terminal List: Dark Wolf</h2>
        <section class="row">
            <section class="col-md-6 info">
                <h3>Descripción</h3>
                <p class="description">Before The Terminal List, Navy SEAL Ben Edwards finds himself entangled in the
                    black operations side of the CIA. The deeper Ben goes into the 'gray', the harder it will become to
                    not give himself over to his darker impulses. Every man has two wolves inside him – light and dark –
                    fighting for control. Which wolf will Ben Edwards feed?</p>
                <p class="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> 2025-08-27</p>
                <p class="mt-0 mb-0" id="episodes"><strong>Número de capítulos:</strong> 7</p>
                <p class="mt-0 seasons"><strong>Temporadas:</strong> 1</p>
            </section>
            <img class="col-md-6" src="https://image.tmdb.org/t/p/w500/9mYeRoWguq5etbwJRdF8BXFKiF.jpg" alt=""/>
        </section>
        </>
    )}

export default SeriesDetail;

