import axios from "axios";
import store from "../redux/store";
import { setGameBoard, setGameState } from "../redux/actions";

const chessRestService = axios.create({
  baseURL: "http://localhost:8080/",
});

export async function newGame() {
  const gameBoard = initGameBoard();

  store.dispatch(setGameBoard(gameBoard));

  const { data: gameState } = await chessRestService.post("/chess");
  gameState.pieces.forEach(piece => {
    gameBoard[piece.position.number][piece.position.letter]['piece'] = piece
  });

  store.dispatch(setGameState(gameState));
  store.dispatch(setGameBoard(Object.assign({}, gameBoard)));

  function initGameBoard() {
    const gameBoard = {};
    for (let number = 1; number <= 8; number++) {
      gameBoard[number] = {};
      for (let letterInt = 97; letterInt <= 104; letterInt++) {
        const letter = String.fromCharCode(letterInt);
        gameBoard[number][letter] = {
          color: ((number + letterInt) % 2) === 0 ? 'black' : 'white',
          position: { number, letter },
          piece: null
        };
      }
    }
    return gameBoard;
  }
}

export async function selectPosition({number, letter}) {
  let gameBoard = getGameBoard();
  let gameState = getGameState();
  let { piece } = gameBoard[number][letter];

  if (!piece || gameState.player !== piece.color) {
    return;
  }
  
  const initialSquareState = gameBoard[number][letter].selected
  gameBoard = mapBoardGameSquares(store.getState()['gameBoard'], square => ({...square, selected: false, playCandidate: false}));
  gameBoard[number][letter].selected = !initialSquareState;

  if (gameBoard[number][letter].selected) {
    let gameId = gameState.id
    const { data: possiblePlays } = await chessRestService.get(`chess/${gameId}/position/${number}/${letter}/possible-plays`);
    gameBoard = mapBoardGameSquares(gameBoard, square => ({...square, playCandidate: isPlayCandidate(square, possiblePlays)}));
  }

  store.dispatch(setGameBoard(gameBoard))

  function isPlayCandidate({ position }, possiblePlays) {
    return possiblePlays
              .filter(({number, letter}) => position.number === number && position.letter === letter)
              .length === 1;
  }
}

function getGameBoard() {
  return store.getState()['gameBoard'];
}

function getGameState() {
  return store.getState()['gameState'];
}

function mapBoardGameSquares(gameBoard, mapper) {
  const newGameBoard = {};
  for (const number in gameBoard) {
    const line = gameBoard[number];
    newGameBoard[number] = {}
    for (const letter in line) {
      const square = line[letter]
      newGameBoard[number][letter] = mapper(square);
    }
  }

  return newGameBoard;
}