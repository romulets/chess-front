import { SET_GAME_BOARD, SET_GAME_STATE, SET_SELECTED_PIECE } from "./constants";

export function setGameBoard(gameBoard) {
    return { type: SET_GAME_BOARD, gameBoard }
};

export function setGameState(gameState) {
    return { type: SET_GAME_STATE, gameState }
};

export function selectPiece(selectedPiece) {
    return { type: SET_SELECTED_PIECE, selectedPiece }
};

export function unselectPiece() {
    return { type: SET_SELECTED_PIECE, selectedPiece: null }
};