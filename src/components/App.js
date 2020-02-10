import React, { Component } from 'react';
import Game from './Game';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="flag-app">
        <header className="title-header">
          <h1 className="title-text">Guess The Flag</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;