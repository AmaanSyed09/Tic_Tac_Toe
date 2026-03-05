import { useState } from "react"; //importing useState from react, to reuse stated needed by both Player and GameBoard components, active plyer state can be added.

import Player from "./components/Player.jsx"; //importing Player component from Player.jsx
import GameBoard from "./components/GameBoard.jsx"; //importing GameBoard component from GameBoard.jsx
import Log from "./components/Log.jsx"; //importing Log component from Log.jsx
import GameOver from "./components/GameOver.jsx"; // importing GameOver component to display the game over message and the winner when a winning combination is met.
import { WINNING_COMBINATIONS } from "./winning-combination.js"; // importing winning combinations from winning-combination.js, this will be used later to check for winning conditions in the game.

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}; // DEFINING HELPER CONSTANT FOR PLAYERS, THIS CAN BE USED TO MAP PLAYER SYMBOLS TO THEIR NAMES, THIS WILL BE USEFUL LATER TO DISPLAY THE WINNER'S NAME IN THE UI INSTEAD OF JUST THEIR SYMBOL.

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X"; // default to 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer; // returning the current active player determined by the last turn in the gameTurns array.
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])]; // initializing gameBoard variable with initialGameBoard array

  for (const turn of gameTurns) {
    const { square, player } = turn; // destructuring square and player to get the square object and player symbol from each turn
    const { row, col } = square; // destructuring row and col from square object to get the row and column indices of the selected square
    gameBoard[row][col] = player; // marking the square at the specified row and column with the player's symbol
  }
  return gameBoard; // returning the updated game board based on the turns that have been made, this will be used to check for winning conditions and to display the current state of the game board in the UI.
}

function deriveWinner(gameBoard, players) {
  let winner; //initially there is no winner, so we can set the winner variable to null or undefined, this variable will be used to store the symbol of the winning player when a winning combination is met.

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) // checking if the first square symbol is not null and if it is the same as the second and third square symbols, if all three squares in the combination have the same symbol and are not null, then we have a winner.
    {
      winner = players[firstSquareSymbol]; // setting the winner variable to the name of the winning player using the players state to get the name based on the symbol, this way we can display the winner's name in the UI instead of just their symbol.
    }
  }
  return winner; // returning the winner determined by checking the winning combinations against the game board state.
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  //manage array of game turns in state
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns); // using the helper function to determine the active player based on the gameTurns state, this will be passed as prop to Player and GameBoard components to let them know which player's turn it is.

  const gameBoard = deriveGameBoard(gameTurns); // using the helper function to derive the current state of the game board based on the gameTurns state, this will be used to check for winning conditions and to display the current state of the game board in the UI.

  const winner = deriveWinner(gameBoard, players); // using the helper function to determine the winner based on the game board state, this will be used to display the winner in the UI when a winning combination is met.
  const hasDraw = gameTurns.length === 9 && !winner; // checking for draw condition, if all squares are filled (gameTurns length is 9) and there is no winner, then it's a draw.

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns); // using the helper function to determine the current active player based on the previous turns, this will ensure that the active player is correctly determined even if the gameTurns state is updated in other ways in the future.

      // setting activePlayer to currentPlayer determined above by  if condition.
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]; // creating a copy of previous turns array using spread operator

      return updatedTurns; // returning the updated turns array to update the state
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange} //passing pointer to handlePlayerNameChange function to Player component to allow it to update the player's name in the App component's state when the name is changed in the Player component.
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* //GAMEBOARD COMPONENT */}

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      {/* //LOG COMPONENT */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
