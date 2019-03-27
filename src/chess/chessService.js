import axios from "axios";
import store from "../redux/store";
import { setGameBoard, setGameState } from "../redux/actions";

const pitsGameService = axios.create({
  baseURL: "http://localhost:8080/",
});

export async function newGame() {
  const gameBoard = {}
  for (let number = 1; number <= 8; number++) {
    gameBoard[number] = {}
    for (let letterInt = 97; letterInt <= 104; letterInt++) {
      const letter = String.fromCharCode(letterInt)
      gameBoard[number][letter] = {
        color: ((number + letterInt) % 2) === 0 ? 'white' : 'black',
        position: { number, letter },
        piece: null
      };
    }
  }

  store.dispatch(setGameBoard(gameBoard));

  const { data: gameState } = await pitsGameService.post("/chess");
  gameState.pieces.forEach(piece => {
    gameBoard[piece.position.number][piece.position.letter]['piece'] = piece
  });

  store.dispatch(setGameState(gameState));
  store.dispatch(setGameBoard(Object.assign({}, gameBoard)));
}