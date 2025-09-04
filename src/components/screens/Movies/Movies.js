import React from "react";

function Movies(params) {
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

        <h2 class="alert alert-primary">Todas las películas</h2>
        <form class="filter-form px-0 mb-3" action="" method="get">
            <input type="text" name="filter" id="" placeholder="Buscar dentro de la lista"/>
        </form>
        
        <button class="btn btn-info">Cargar más</button>

        <section class="row cards all-movies" id="movies">
            <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/tzrJulItjttxzoX0t3B2My46TS7.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">The Thursday Murder Club</h5>
                    <p class="card-text">A group of senior sleuths passionate about solving cold cases get plunged into
                        a real-life murder mystery in this comic crime caper.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">F1</h5>
                    <p class="card-text">Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling
                        Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">I Know What You Did Last Summer</h5>
                    <p class="card-text">When five friends inadvertently cause a deadly car accident, they cover up
                        their involvement and make a pact to keep it a secret rather than face the consequences. A year
                        later, their past comes back to haunt them and they're forced to confront a horrifying truth:
                        someone knows what they did last summer…and is hell-bent on revenge.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">Superman</h5>
                    <p class="card-text">Superman, a journalist in Metropolis, embarks on a journey to reconcile his
                        Kryptonian heritage with his human upbringing as Clark Kent.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                </div>
            </article>
                        <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">F1</h5>
                    <p class="card-text">Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling
                        Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg" class="card-img-top"
                    alt="..."/>
                <div class="cardBody">
                    <h5 class="card-title">I Know What You Did Last Summer</h5>
                    <p class="card-text">When five friends inadvertently cause a deadly car accident, they cover up
                        their involvement and make a pact to keep it a secret rather than face the consequences. A year
                        later, their past comes back to haunt them and they're forced to confront a horrifying truth:
                        someone knows what they did last summer…and is hell-bent on revenge.</p>
                    <a href="movie.html" class="btn btn-primary">Ver más</a>
                </div>
            </article>
            
        </section>

       
    </div>

    )
}

export default Movies;