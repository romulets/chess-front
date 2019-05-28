import React, { Component } from "react";
import Square from "./Square";
import { connect } from "react-redux";
import "./GameBoard.css"

class GameBoard extends Component {

  render() {
    return (
      <div className="GameBoard-container">
        <p>{this.props.gameState.player} turn</p>
        <div className="GameBoard-inner-container">
          <div className="GameBoard-left-ruler">
            <div className="GameBoard-reference">1</div>
            <div className="GameBoard-reference">2</div>
            <div className="GameBoard-reference">3</div>
            <div className="GameBoard-reference">4</div>
            <div className="GameBoard-reference">5</div>
            <div className="GameBoard-reference">6</div>
            <div className="GameBoard-reference">7</div>
            <div className="GameBoard-reference">8</div>
          </div>
          <div className="GameBoard">
            {Object.values(this.props.gameBoard).map((line, key) => (
              <div key={key} className="GameBoard-line">
                {Object.values(line).map((square, key) => (<Square key={key} model={square} />))}
              </div>
            ))}
          </div>
        </div>
        <div className="GameBoard-bottom-ruler">
          <div className="GameBoard-reference">a</div>
          <div className="GameBoard-reference">b</div>
          <div className="GameBoard-reference">c</div>
          <div className="GameBoard-reference">d</div>
          <div className="GameBoard-reference">e</div>
          <div className="GameBoard-reference">f</div>
          <div className="GameBoard-reference">g</div>
          <div className="GameBoard-reference">h</div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { gameBoard: state.gameBoard, gameState: state.gameState };
};

export default connect(mapStateToProps)(GameBoard);