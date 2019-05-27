import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Square.css";
import Piece from "../atom/Piece";

class Square extends Component {

  render() {
    const { color, piece } = this.props.model
    return (
      <div className={classNames('Square', 'Square-' + color)}>
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