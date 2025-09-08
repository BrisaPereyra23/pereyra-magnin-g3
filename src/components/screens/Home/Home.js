import React from "react";

function Home() {
    return(
        <div classNameName="container">
        <h1>UdeSA Movies</h1>

        <nav>
            <ul className="nav nav-tabs my-4">
                <li className="nav-item">
                    <a className="nav-link" href="index.html">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="movies.html">Películas</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="series.html">Series</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="favorites.html">Favoritas</a>
                </li>
            </ul>
            
            <form className="search-form" action="results.html" method="get">
                <input type="text" className="" name="searchData" placeholder="Buscar..." value=""/>
                <button type="submit" className="btn btn-success btn-sm">Buscar</button>
            </form>
        </nav>

        <h2 className="alert alert-primary">Popular movies this week</h2>
        <section className="row cards" id="movies">
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/tzrJulItjttxzoX0t3B2My46TS7.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">The Thursday Murder Club</h5>
                    <p className="card-text">A group of senior sleuths passionate about solving cold cases get plunged into
                        a real-life murder mystery in this comic crime caper.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">F1</h5>
                    <p className="card-text">Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling
                        Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">♥️</a>
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
                    <a href="" className="btn alert-primary">♥️</a>
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
                    <a href="" className="btn alert-primary">♥️</a>
                </div>
            </article>
        </section>

        <h2 className="alert alert-primary">Movies now playing</h2>
        <section className="row cards" id="now-playing">
            <article className="single-card-playing">
                <img src="https://image.tmdb.org/t/p/w500/yvirUYrva23IudARHn3mMGVxWqM.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">War of the Worlds</h5>
                    <p className="card-text">Will Radford is a top analyst for Homeland Security who tracks potential
                        threats through a mass surveillance program, until one day an attack by an unknown entity leads
                        him to question whether the government is hiding something from him... and from the rest of the
                        world.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-playing">
                <img src="https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">F1</h5>
                    <p className="card-text">Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling
                        Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">♥️</a>
                </div>
            </article>
            <article className="single-card-playing">
                <img src="https://image.tmdb.org/t/p/w500/12Va3oO3oYUdOd75zM57Nx1976a.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Eenie Meanie</h5>
                    <p className="card-text">A former teenage getaway driver gets dragged back into her unsavory past when a
                        former employer offers her a chance to save the life of her chronically unreliable ex-boyfriend.
                    </p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-playing">
                <img src="https://image.tmdb.org/t/p/w500/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Jurassic World Rebirth</h5>
                    <p className="card-text">Five years after the events of Jurassic World Dominion, covert operations
                        expert Zora Bennett is contracted to lead a skilled team on a top-secret mission to secure
                        genetic material from the world's three most massive dinosaurs. When Zora's operation intersects
                        with a civilian family whose boating expedition was capsized, they all find themselves stranded
                        on an island where they come face-to-face with a sinister, shocking discovery that's been hidden
                        from the world for decades.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-playing">
                <img src="https://image.tmdb.org/t/p/w500/m52XidzKx94bKlToZfEXUnL3pdy.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Together</h5>
                    <p className="card-text">With a move to the countryside already testing the limits of a couple's
                        relationship, a supernatural encounter begins an extreme transformation of their love, their
                        lives, and their flesh.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-playing">
                <img src="https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">I Know What You Did Last Summer</h5>
                    <p className="card-text">When five friends inadvertently cause a deadly car accident, they cover up
                        their involvement and make a pact to keep it a secret rather than face the consequences. A year
                        later, their past comes back to haunt them and they're forced to confront a horrifying truth:
                        someone knows what they did last summer…and is hell-bent on revenge.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">♥️</a>
                </div>
            </article>
        </section>
        <h2 className="alert alert-warning">Popular TV shows this week</h2>
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
                    <a href="" className="btn alert-primary">♥️</a>
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
                    <a href="" className="btn alert-primary">♥️</a>
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
                    <a href="" className="btn alert-primary">♥️</a>
                </div>
            </article>
            <article className="single-card-tv">
                <img src="https://image.tmdb.org/t/p/w500/6TPGDrU9MyWbn2TpggJphVAVXiq.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Upload</h5>
                    <p className="card-text">In 2033, people who are near death can be “uploaded” into virtual reality
                        hotels run by 6 tech firms. Cash-strapped Nora lives in Brooklyn and works customer service for
                        the luxurious “Lakeview” digital afterlife. When L.A. party-boy/coder Nathan’s self-driving car
                        crashes, his high-maintenance girlfriend uploads him permanently into Nora’s VR world.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-tv">
                <img src="https://image.tmdb.org/t/p/w500/3m1UaMLgmpj6krNaQwTpftYFsnz.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">A Record of a Mortal's Journey to Immortality</h5>
                    <p className="card-text">A poor and ordinary boy from a village joins a minor sect in Jiang Hu and
                        becomes an Unofficial Disciple by chance. How will Han Li, a commoner by birth, establish a
                        foothold for himself in his sect? With his mediocre aptitude, he must successfully traverse the
                        treacherous path of cultivation and avoid the notice of those who may do him harm. This is a
                        story of an ordinary mortal who, against all odds, clashes with devilish demons and ancient
                        celestials in order to find his own path towards immortality.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
        </section>
        <h2 className="alert alert-warning">TV shows airing today</h2>
        <section className="row cards" id="on-air-today">
            <article className="single-card-on-air mb-3">
                <img src="https://image.tmdb.org/t/p/w500/wRpCqsJFyKNuh5FMegNPrhzp2NF.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">SAKAMOTO DAYS</h5>
                    <p className="card-text">Once the greatest hitman of all, Taro Sakamoto retired in the name of love. But
                        when his past catches up, he must fight to protect his beloved family.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-on-air mb-3">
                <img src="https://image.tmdb.org/t/p/w500/u9cmfrKrUj0sykZc4BrdgcXbVN1.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Moonlit Reunion</h5>
                    <p className="card-text">Mei Zhuyu, a calm and reserved nobleman from a lesser branch of the Mei family,
                        arrives in Chang'an as an official at the Bureau of Mystic Investigations. During a banquet, he
                        meets Wu Zhen, the bold and unruly younger sister of the Empress and secret Guardian of the
                        Demon Underworld. Both hide their true identities. Wu, a half-demon striving to keep peace, and
                        Mei, a skilled demon slayer, seek the truth behind the fire 18 years ago. As bone demons rise
                        and unrest grows, they fight side by side, forming a bond that deepens into love until the
                        Changxi Palace launches a purge, forcing them to face each other's secrets and the past they
                        share.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-on-air mb-3">
                <img src="https://image.tmdb.org/t/p/w500/3bzECfllho8PphdYujLUIuhncJD.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Binnelanders</h5>
                    <p className="card-text">A South African Afrikaans soap opera. It is set in and around the fictional
                        private hospital, Binneland Kliniek, in Pretoria, and the storyline follows the trials, trauma
                        and tribulations of the staff and patients of the hospital.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-on-air mb-3">
                <img src="https://image.tmdb.org/t/p/w500/15yDwRPWsI75RdJaBVgb4K5m94I.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">When Destiny Brings the Demon</h5>
                    <p className="card-text">Modern-day office drone Zou Yan accidentally stumbles into the world of
                        cultivation and wakes up as Liao Tingyan, a disciple of the Qinggutian Sect. She's soon selected
                        to serve the reclusive Grandmaster Sima Jiao, a powerful cultivator who's been secretly sealed
                        inside a mountain for 500 years. Twisted by isolation and rage, he's cold, hot-tempered, and
                        bent on revenge. Liao Tingyan doesn't know that "her" original identity is a demonic assassin.
                        But to his surprise, she shows no ill will, no ambition, and no desire at all. Her nature
                        fascinates him. Thus begins an unlikely romance between a villainous immortal and a healing-type
                        "slacker," a connection that defies fate and spans lifetimes.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-on-air mb-3">
                <img src="https://image.tmdb.org/t/p/w500/jfFNydakwvbeACEwSd2Gh8UWtba.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Sturm der Liebe</h5>
                    <p className="card-text">These are the stories of relationships taking place in the fictional five-star
                        hotel Fürstenhof, located in Feldkirchen-Westerham near Rosenheim with the plot revolving around
                        members of the family room area, the hotel owners, and employees.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="" className="btn alert-primary">🩶</a>
                </div>
            </article>
            <article className="single-card-on-air mb-3">
                <img src="https://image.tmdb.org/t/p/w500/pv5WNnLUo7mpT8k901Lo8UovrqI.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Raw</h5>
                    <p className="card-text">A regularly scheduled, live, year-round program featuring some of the biggest
                        WWE Superstars.</p>
                    <a href="serie.html" className="btn btn-primary">Ver más</a>
                    <a href="serie.html" className="btn alert-primary">🩶</a>
                </div>
            </article>

        </section>
    </div>
    )
}

export default Home;