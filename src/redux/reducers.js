import { SET_GAME_BOARD, SET_GAME_STATE, SET_SELECTED_PIECE } from "./constants";

const initialState = {
    gameBoard: {},
    gameState: { pieces: [] },
    selectedPiece: null
  };

  function rootReducer(state = initialState, action) {
    if (action.type === SET_GAME_BOARD) {
        return Object.assign({}, state, {
            gameBoard: action.gameBoard
          });
      } else  if (action.type === SET_GAME_STATE) {
        return Object.assign({}, state, {
            gameState: action.gameState
          });
      } else  if (action.type === SET_SELECTED_PIECE) {
        return Object.assign({}, state, {
            selectedPiece: action.selectedPiece
          });
      }

      return state;
  };

  export default rootReducer;