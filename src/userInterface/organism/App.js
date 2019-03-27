import React, { Component } from 'react';
import './App.css';
import GameBoard from '../molecule/GameBoard';
import { newGame } from '../../chess/chessService';

class App extends Component {

  componentDidMount() {
    newGame();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         <h1>Chess</h1>
         <GameBoard />
        </header>
      </div>
    );
  }
}

export default App;
