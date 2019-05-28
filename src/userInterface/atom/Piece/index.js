import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as KnightIcon} from "./knight.svg"
import { ReactComponent as PawnIcon} from "./pawn.svg"
import { ReactComponent as QueenIcon} from "./queen.svg"
import { ReactComponent as KingIcon} from "./king.svg"
import { ReactComponent as RookIcon} from "./rook.svg"
import { ReactComponent as BishopIcon} from "./bishop.svg"

import "./index.css"

const BLACK_FILL = '#000'
const BLACK_STROKE = '#fff'
const WHITE_FILL = '#fff'
const WHITE_STROKE = '#000'
const PIECE_WIDTH = "40px"
const PIECE_STROKE_WIDTH = "10px"

const piecesIcons = {
  'com.romulo.chess.domain.piece.Pawn': {
    BLACK: <PawnIcon fill={BLACK_FILL} stroke={BLACK_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />,
    WHITE: <PawnIcon fill={WHITE_FILL} stroke={WHITE_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />
  },
  'com.romulo.chess.domain.piece.Rook': {
    BLACK: <RookIcon fill={BLACK_FILL} stroke={BLACK_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />,
    WHITE: <RookIcon fill={WHITE_FILL} stroke={WHITE_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />
  },
  'com.romulo.chess.domain.piece.Knight': {
    BLACK: <KnightIcon fill={BLACK_FILL} stroke={BLACK_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />,
    WHITE: <KnightIcon fill={WHITE_FILL} stroke={WHITE_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />
  },
  'com.romulo.chess.domain.piece.Bishop': {
    BLACK: <BishopIcon fill={BLACK_FILL} stroke={BLACK_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />,
    WHITE: <BishopIcon fill={WHITE_FILL} stroke={WHITE_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />
  },
  'com.romulo.chess.domain.piece.Queen': {
    BLACK: <QueenIcon fill={BLACK_FILL} stroke={BLACK_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />,
    WHITE: <QueenIcon fill={WHITE_FILL} stroke={WHITE_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />
  },
  'com.romulo.chess.domain.piece.King': {
    BLACK: <KingIcon fill={BLACK_FILL} stroke={BLACK_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />,
    WHITE: <KingIcon fill={WHITE_FILL} stroke={WHITE_STROKE} strokeWidth={PIECE_STROKE_WIDTH} width={PIECE_WIDTH} />
  },
}

class Piece extends Component {

  render() {
    const { color, type } = this.props
    return piecesIcons[type][color]
  }

}

Piece.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Piece