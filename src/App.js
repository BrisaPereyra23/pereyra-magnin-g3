import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Home from './components/screens/Home/Home';
import MovieDetail from './components/screens/MovieDetail/MovieDetail';
import SerieDetail from './components/screens/SerieDetail/SerieDetail';
import Movies from './components/screens/Movies/Movies';
import Series from './components/screens/Series/Series';
import Favorites from "./components/screens/Favorites/Favorites";
import Results from "./components/screens/Results/Results";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact={true} component={<Home />} />
        <Route path="/movies" exact={true} component={<Movies />} />
        <Route path="/series" exact={true} component={<Series />} />
        <Route path="/movies/id/:id" component={<MovieDetail />} />
        <Route path="/series/id/:id" component={<SerieDetail />} />
        <Route path="/favorites" exact={true} component={<Favorites />} />
        <Route path="/results" exact={true} component={<Results />} />
      </Switch>
    </>
  );
}

export default App;
