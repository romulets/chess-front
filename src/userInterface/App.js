import React, { Component } from 'react';
import './App.css';
import GameBoard from './molecules/GameBoard';

class App extends Component {
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
