
import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './screens/Home/Home';
import Movies from './screens/Movies/Movies';
import Series from './screens/Series/Series';
import Favorites from './screens/Favorites/Favorites';
import Detail from './screens/Detail/Detail';
import Results from './screens/Results/Results';
import NotFound from './screens/NotFound/NotFound';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* Comentario en JSX img src={logo} className="App-logo" alt="" */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">Learn React</a>
      </header>
      <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movies/:id" exact={true} component={Movies} />
        <Route path="/series/:id" component={Series} />
        <Route path="/favorites" exact={true} component={Favorites} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/results/:query" exact={true} component={Results} />
        <Route component={NotFound} />
        
      
      </Switch>
    </div>
    </div>
  );
}

export default App;