
import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from "../src/components/Navbar/Navbar";
import Loader from "../src/components/Loader/Loader";
import Card from "../src/components/Card/Card";
import Cards from "../src/components/Cards/Cards";
import Footer from "../src/components/Footer/Footer";
import Header from "../src/components/Header/Header";
import Detail from "../src/components/screens/Detail/Detail"
import Favorites from "../src/components/screens/Favorites/Favorites"
import Home from "../src/components/screens/Home/Home"
import Movies from "../src/components/screens/Movies/Movies"
import NotFound from "../src/components/screens/NotFound/NotFound"
import Results from "../src/components/screens/Results/Results"
import Series from "../src/components/screens/Series/Series"


function App() {
  return (
    <div className="App"> <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies/id/:id" exact={true} component={Movies} />
        <Route path="/series/id/:id" component={Series} />
        <Route path="/favorites" exact={true} component={Favorites} />
        <Route path="/detail/id/:id" component={Detail} />
        <Route path="/results/:query" exact={true} component={Results} />
        <Route path="" component={NotFound} />
      </Switch>
      <Loader/>
      <Card/>
      <Footer/>
    </div>
    </div>
  );
}

export default App;