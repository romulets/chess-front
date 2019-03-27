import { SET_GAME_BOARD, SET_GAME_STATE } from "./constants";

const initialState = {
    gameBoard: {},
    gameState: { pieces: [] },
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
      }

      return state;
  };

  export default rootReducer;