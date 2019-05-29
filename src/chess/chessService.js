import axios from "axios";
import store from "../redux/store";
import { setGameBoard, setGameState, selectPiece, unselectPiece } from "../redux/actions";

const chessRestService = axios.create({
  baseURL: "http://localhost:8080/",
});

export async function newGame() {
  const gameBoard = initGameBoard();

  store.dispatch(setGameBoard(gameBoard));

  const { data: gameState } = await chessRestService.post("/chess");

  store.dispatch(setGameState(gameState));
  store.dispatch(setGameBoard(mapGameStateToGameBoard(gameState, gameBoard)));

}

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

function mapGameStateToGameBoard(gameState) {
  const gameBoard = initGameBoard();
  gameState.pieces.forEach(piece => {
    gameBoard[piece.position.number][piece.position.letter]['piece'] = piece
  });

  return gameBoard
}

export async function selectSquare(position) {
  const gameBoard = getGameBoard();
  const gameState = getGameState();
  const selectedPiece = getSelectedPiece();
  const { number, letter } = position;
  const { piece: pieceInSquare } = gameBoard[number][letter];

  if (selectedPiece && isPlayCandidate(position, selectedPiece.possiblePlays)) {
    await play(gameState, selectedPiece.position, position);
  } else if(pieceInSquare && gameState.player === pieceInSquare.color) {
    await updateGameStateToSelectPiece(gameBoard, gameState, position);
  }

  async function play({id: gameId}, from, to) {
    const { data: gameState } = await chessRestService.put(`chess/${gameId}`, { from, to });
    const playedGameBoard = mapGameStateToGameBoard(gameState)
    store.dispatch(setGameState(gameState));
    store.dispatch(setGameBoard(playedGameBoard));
    store.dispatch(unselectPiece());
  }
  
  async function updateGameStateToSelectPiece(gameBoard, {id: gameId}, {number, letter}) {
    const gameBoardWithPieceSelected = selectPieceInGameBoard(gameBoard);

    if (gameBoardWithPieceSelected[number][letter].selected) {
      const { data: possiblePlays } = await chessRestService.get(`chess/${gameId}/position/${number}/${letter}/possible-plays`);
      const completeGameBoard = mapBoardGameSquares(gameBoardWithPieceSelected, square => ({
         ...square, 
         playCandidate: isPlayCandidate(square.position, possiblePlays) 
        }));

      store.dispatch(selectPiece({ ...completeGameBoard[number][letter].piece, possiblePlays }));
      store.dispatch(setGameBoard(completeGameBoard))
    } else {
      store.dispatch(unselectPiece());
      store.dispatch(setGameBoard(gameBoardWithPieceSelected))
    }
  }

  function selectPieceInGameBoard(gameBoard) {
    const initialSquareState = gameBoard[number][letter].selected;
    const cleanGameBoard = unsetAllSquaresSelections(gameBoard);
    cleanGameBoard[number][letter].selected = !initialSquareState;
    return cleanGameBoard
  }

  function unsetAllSquaresSelections(gameBoard) {
    return mapBoardGameSquares(gameBoard, square => ({ ...square, selected: false, playCandidate: false }));
  }

  function isPlayCandidate(position, possiblePlays) {
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

function getSelectedPiece() {
  return store.getState()['selectedPiece'];
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