import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as KnightIcon} from "./knight.svg"
import { ReactComponent as PawnIcon} from "./pawn.svg"
import { ReactComponent as QueenIcon} from "./queen.svg"
import { ReactComponent as KingIcon} from "./king.svg"
import { ReactComponent as RookIcon} from "./rook.svg"
import { ReactComponent as BishopIcon} from "./bishop.svg"

import "./index.css"

const piecesIcons = {
  'com.romulo.chess.domain.piece.Pawn': {
    BLACK: <PawnIcon width="40px" fill="#fff" stroke="#000" strokeWidth="10px"/>,
    WHITE: <PawnIcon width="40px" fill="#000" stroke="#fff" strokeWidth="10px"/>
  },
  'com.romulo.chess.domain.piece.Rook': {
    BLACK: <RookIcon width="40px" fill="#fff" stroke="#000" strokeWidth="10px"/>,
    WHITE: <RookIcon width="40px" fill="#000" stroke="#fff" strokeWidth="10px"/>
  },
  'com.romulo.chess.domain.piece.Knight': {
    BLACK: <KnightIcon width="40px" fill="#fff" stroke="#000" strokeWidth="10px"/>,
    WHITE: <KnightIcon width="40px" fill="#000" stroke="#fff" strokeWidth="10px"/>
  },
  'com.romulo.chess.domain.piece.Bishop': {
    BLACK: <BishopIcon width="40px" fill="#fff" stroke="#000" strokeWidth="10px"/>,
    WHITE: <BishopIcon width="40px" fill="#000" stroke="#fff" strokeWidth="10px"/>
  },
  'com.romulo.chess.domain.piece.Queen': {
    BLACK: <QueenIcon width="40px" fill="#fff" stroke="#000" strokeWidth="10px"/>,
    WHITE: <QueenIcon width="40px" fill="#000" stroke="#fff" strokeWidth="10px"/>
  },
  'com.romulo.chess.domain.piece.King': {
    BLACK: <KingIcon width="40px" fill="#fff" stroke="#000" strokeWidth="10px"/>,
    WHITE: <KingIcon width="40px" fill="#000" stroke="#fff" strokeWidth="10px"/>
  },
}

class Piece extends Component {

  render() {
    const { color, type } = this.props
    console.log(color)
    return piecesIcons[type][color]
  }

}

Piece.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Piece