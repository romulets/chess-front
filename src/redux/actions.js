import { SET_GAME_BOARD, SET_GAME_STATE } from "./constants";

export function setGameBoard(gameBoard) {
    return { type: SET_GAME_BOARD, gameBoard }
};

export function setGameState(gameState) {
    return { type: SET_GAME_STATE, gameState }
};