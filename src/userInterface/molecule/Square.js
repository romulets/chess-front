import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Square.css";
import Piece from "../atom/Piece";
import { selectSquare } from "../../chess/chessService";

class Square extends Component {

  selectSquare() {
      const { position } = this.props.model
      selectSquare(position)
  }

  render() {
    const { color, piece, selected, playCandidate } = this.props.model;
    const classes = classNames(
      'Square', 
      'Square-' + color, 
      selected ? 'Square-selected' : null,
      playCandidate ? 'Square-candidate' : null
      );

    return (
      <div className={classes} onClick={this.selectSquare.bind(this)} >
        {(() => {
          if (piece) {
            return <Piece color={piece.color} type={piece.type} />
          }
        })()}
      </div>
    )
  }

}

Square.propTypes = {
  model: PropTypes.object.isRequired
}

export default Square