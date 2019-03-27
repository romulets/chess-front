import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Square.css";

const piecesLabels = {
  'com.romulo.chess.domain.piece.Pawn': 'Pn',
  'com.romulo.chess.domain.piece.Rook': 'Rk',
  'com.romulo.chess.domain.piece.Knight': 'Kt',
  'com.romulo.chess.domain.piece.Bishop': 'Bp',
  'com.romulo.chess.domain.piece.Queen': 'Qn',
  'com.romulo.chess.domain.piece.King': 'Kg'
}

class Square extends Component {

  render() {
    const { color, piece } = this.props.model
    return (
      <div className={classNames('Square', 'Square-' + color)}>
        {(() => {
          if (piece) {
            return piecesLabels[piece.type]
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