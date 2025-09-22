
import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from "../src/components/Footer/Footer";
import Favorites from "../src/components/screens/Favorites/Favorites"
import Home from "../src/components/screens/Home/Home"
import MoviesDetail from "../src/components/screens/MoviesDetail/MoviesDetail"
import NotFound from "../src/components/screens/NotFound/NotFound"
import Results from "../src/components/screens/Results/Results"
import SeriesDetail from "../src/components/screens/SeriesDetail/SeriesDetail"
import Movies from "../src/components/screens/Movies/Movies"
import Series from "../src/components/screens/Series/Series"

function App() {
  return (
    <div className="App">
       <div>  
        <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/detail/movies/:id"  component={MoviesDetail} /> 
        <Route path="/detail/series/:id"  component={SeriesDetail} />
        <Route path="/movies"  component={Movies} />
        <Route path="/movies/popular" component={Movies} />
        <Route path="/series" component={Series} /> 
        <Route path="/series/popular" component={Series} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/results/:tipo/:query" component={Results} /> 
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer/>
    </div>
    </div>
  );
}

export default App;