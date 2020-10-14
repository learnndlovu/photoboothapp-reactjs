import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './photobooth/Home';
import Snap from './photobooth/Snap';

const App = () => {
    return (
      <div className="app">
        <BrowserRouter>
          <div className="app__content">
            <h1 className="app__logo">Snap!</h1>
            <Route path="/" exact component={Home} />
            <Route path="/snap" exact component={Snap} />
          </div>
        </BrowserRouter>
      </div>
    );
}

export default App;
