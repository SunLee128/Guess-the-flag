import React from 'react';
import QuestionBar from 'components/QuestionBar'
import Flag from 'components/Flag';
import Game from 'components/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <QuestionBar />
      <Flag />
      <Game />
    </div>
  );
}

export default App;
