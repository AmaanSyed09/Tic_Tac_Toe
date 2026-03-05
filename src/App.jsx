import { useState } from "react"; //importing useState from react, to reuse stated needed by both Player and GameBoard components, active plyer state can be added.

import Player from "./components/Player.jsx"; //importing Player component from Player.jsx
import GameBoard from "./components/GameBoard.jsx"; //importing GameBoard component from GameBoard.jsx
import Log from "./components/Log.jsx"; //importing Log component from Log.jsx
import GameOver from "./components/GameOver.jsx"; // importing GameOver component to display the game over message and the winner when a winning combination is met.
import { WINNING_COMBINATIONS } from "./winning-combination.js"; // importing winning combinations from winning-combination.js, this will be used later to check for winning conditions in the game.

// const WINNING_COMBINATIONS = [
//   [
//     { row: 0, col: 0 },
//     { row: 0, col: 1 },
//     { row: 0, col: 2 },
//   ],
// ]; // DEFINING HELPER CONSTANT FOR WINNING COMBINATIONS, THIS CAN BE USED LATER TO CHECK FOR WINNING CONDITIONS IN THE GAME.
// moved the above code to winning-combination.js to keep the App component cleaner and more focused on rendering the UI, while the winning combinations are defined in a separate file for better organization and maintainability.

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}; // DEFINING HELPER CONSTANT FOR PLAYERS, THIS CAN BE USED TO MAP PLAYER SYMBOLS TO THEIR NAMES, THIS WILL BE USEFUL LATER TO DISPLAY THE WINNER'S NAME IN THE UI INSTEAD OF JUST THEIR SYMBOL.
// moved the above code to App component's state to allow it to be dynamic and updatable when the player names are edited in the Player component, this way we can keep track of the player names in the App component's state and update them as needed when the user edits their names in the Player component.

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  // creating helper function , helper function doesnt need access to state or component lifecycle, so it can be defined outside of the App component.

  let currentPlayer = "X"; // default to 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    // checking the last turn's player, if it was 'X', current player will be 'O', otherwise 'X'.
    currentPlayer = "O";
  }
  return currentPlayer; // returning the current active player determined by the last turn in the gameTurns array.
}
function deriveGameBoard(gameTurns) {
  // passing gameTurns as parameter to derive the current state of the game board based on the turns that have been made, this will allow us to keep track of the current state of the game board and check for winning conditions based on that state.
  let gameBoard = [...initialGameBoard.map((array) => [...array])]; // initializing gameBoard variable with initialGameBoard array
  // creating copies of the inner arrays in initialGameBoard to ensure that we have a fresh copy of the game board for each render, this way we can safely update the gameBoard variable without mutating the original initialGameBoard array, which is important for maintaining the integrity of our state and ensuring that our component re-renders correctly when the game board changes.

  for (const turn of gameTurns) {
    // changed turns to gameTurns to reflect the state variable name, this loop iterates over each turn in the gameTurns array to update the gameBoard variable to mark the selected squares with the respective player's symbol, this way we can keep track of the current state of the game board based on the turns that have been made.
    const { square, player } = turn; // destructuring square and player to get the square object and player symbol from each turn
    const { row, col } = square; // destructuring row and col from square object to get the row and column indices of the selected square
    gameBoard[row][col] = player; // marking the square at the specified row and column with the player's symbol
  }
  return gameBoard; // returning the updated game board based on the turns that have been made, this will be used to check for winning conditions and to display the current state of the game board in the UI.
}

function deriveWinner(gameBoard, players) {
  // creating helper function to determine the winner based on the game board state. to make app component cleaner.
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
      // winner = firstSquareSymbol; // setting the winner variable to the symbol of the winning player.
      winner = players[firstSquareSymbol]; // setting the winner variable to the name of the winning player using the players state to get the name based on the symbol, this way we can display the winner's name in the UI instead of just their symbol.
    }
  }
  return winner; // returning the winner determined by checking the winning combinations against the game board state.
}

function App() {
  const [players, setPlayers] = useState(
    // {
    // //state updating function.
    // X: "Player 1",
    // O: "Player 2",
    // }
    PLAYERS,
    // using the PLAYERS constant as the initial state for the players state.
  );

  //manage array of game turns in state
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X"); // initial active player is 'x', can be used to track whose turn it is.
  //commenting const [activePlayer, setActivePlayer] = useState("X"); because active player state is being managed by gameTurns state, we can determine the active player based on the last turn in the gameTurns array, if the last turn was made by 'X', then the active player is 'O', and vice versa.

  // let currentActivePlayer = "X"; // default to 'X'
  // if (gameTurns.length > 0 && gameTurns[0].player === "X") {
  //   // checking the last turn's player, if it was 'X', current player will be 'O', otherwise 'X'.
  //   currentPlayer = "O";
  // }
  // moved above in helper function deriveActivePlayer to keep the App component cleaner and more focused on rendering the UI, while the logic for determining the active player is encapsulated in a separate function.
  // const [hasWinner, setHasWinner] = useState(false); // state to track if there is a winner in the game, comented because we can erive this information from the gameTurns state by checking if any of the winning combinations are met by the turns in the gameTurns array.

  const activePlayer = deriveActivePlayer(gameTurns); // using the helper function to determine the active player based on the gameTurns state, this will be passed as prop to Player and GameBoard components to let them know which player's turn it is.

  // let gameBoard = [...initialGameBoard.map((array) => [...array])]; // initializing gameBoard variable with initialGameBoard array
  // // creating copies of the inner arrays in initialGameBoard to ensure that we have a fresh copy of the game board for each render, this way we can safely update the gameBoard variable without mutating the original initialGameBoard array, which is important for maintaining the integrity of our state and ensuring that our component re-renders correctly when the game board changes.

  // for (const turn of gameTurns) {
  //   // changed turns to gameTurns to reflect the state variable name, this loop iterates over each turn in the gameTurns array to update the gameBoard variable to mark the selected squares with the respective player's symbol, this way we can keep track of the current state of the game board based on the turns that have been made.
  //   const { square, player } = turn; // destructuring square and player to get the square object and player symbol from each turn
  //   const { row, col } = square; // destructuring row and col from square object to get the row and column indices of the selected square
  //   gameBoard[row][col] = player; // marking the square at the specified row and column with the player's symbol
  // } moving gameBoard above to function deriveGameBoard.

  const gameBoard = deriveGameBoard(gameTurns); // using the helper function to derive the current state of the game board based on the gameTurns state, this will be used to check for winning conditions and to display the current state of the game board in the UI.
  // let winner; //initially there is no winner, so we can set the winner variable to null or undefined, this variable will be used to store the symbol of the winning player when a winning combination is met.
  // for (const combination of WINNING_COMBINATIONS) {
  //   const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
  //   const secondSquareSymbol =
  //     gameBoard[combination[1].row][combination[1].col];
  //   const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

  //   if (
  //     firstSquareSymbol &&
  //     firstSquareSymbol === secondSquareSymbol &&
  //     firstSquareSymbol === thirdSquareSymbol
  //   ) // checking if the first square symbol is not null and if it is the same as the second and third square symbols, if all three squares in the combination have the same symbol and are not null, then we have a winner.
  //   {
  //     // winner = firstSquareSymbol; // setting the winner variable to the symbol of the winning player.
  //     winner = players[firstSquareSymbol]; // setting the winner variable to the name of the winning player using the players state to get the name based on the symbol, this way we can display the winner's name in the UI instead of just their symbol.
  //   }
  // } // check the winning combinations against the gameTurns state to determine if there is a winner, this can be done by iterating over the WINNING_COMBINATIONS array and checking if any of the combinations are met by the turns in the gameTurns array, if a winning combination is found, we can set the hasWinner state to true or derive this information directly in the render method to display the winner in the UI.
  // moved to function deriveWinner above to keep app.jsx clearer.

  const winner = deriveWinner(gameBoard, players); // using the helper function to determine the winner based on the game board state, this will be used to display the winner in the UI when a winning combination is met.
  const hasDraw = gameTurns.length === 9 && !winner; // checking for draw condition, if all squares are filled (gameTurns length is 9) and there is no winner, then it's a draw.

  function handleSelectSquare(rowIndex, colIndex) {
    // Function to handle square selection will be implemented here
    // passing rowIndex and colIndex as parameters to know which square was selected in setGameTurns below.
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X")); // toggles active player between 'x' and 'o' when a square is selected, new state depends on previous state so functional update form is used.
    //commented out setActivePlayer because active player state is being managed by gameTurns state, we can determine the active player based on the last turn in the gameTurns array, if the last turn was made by 'X', then the active player is 'O', and vice versa.

    //calling setGameTurns to update the gameTurns state when a square is selected
    setGameTurns((prevTurns) => {
      // Determine the current player based on previous turns

      // let currentPlayer = "X"; // default to 'X'
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   // checking the last turn's player, if it was 'X', current player will be 'O', otherwise 'X'.
      //   currentPlayer = "O";
      // }
      //commenting out the above code to determine current player because we have already created a helper function deriveActivePlayer to determine the active player based on the gameTurns state, we can use that function here to get the current active player.

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
    // function to handle game restart, this will be called when the "Rematch!" button is clicked in the GameOver component.
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      // calling setPlayer from above defined state to update the players state when a player's name is changed, this function will be passed as prop to the Player component to allow it to update the player's name in the App component's state.
      return {
        ...prevPlayers,
        [symbol]: newName,
        //overriding one of the two properties using js syntax [] dynamically. This will update the name of the player with the specified symbol (either 'X' or 'O') to the new name provided, while keeping the other player's name unchanged by spreading the previous players state into the new object.
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* //players list here  */}
        <ol id="players" className="highlight-player">
          {/* //component created in Player.jsx imported and used here */}

          {/* <li>
            <span className="player">
              <span className="player-name">Player 1</span>
              <span className="player-symbol">X</span>
            </span>
            <button>Edit</button>
          </li> */}

          {/* // using newly created Player component, passing value to name and symbol manually as props */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange} //passing pointer to handlePlayerNameChange function to Player component to allow it to update the player's name in the App component's state when the name is changed in the Player component.
          />
          {/* // adding isActive prop to highlight active player based on activePlayer state, when activePlayer is 'X', first Player component will be highlighted. */}
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
          {/* when the state of first Player component changes, the second one does not change because they have their own separate states. */}
        </ol>
        {/* // caling onSelectSquare prop function from GameBoard component under handleSelectSquare function to update active player state when a square is selected. */}

        {/* //GAMEBOARD COMPONENT */}

        {/* {winner && <p>You won, {winner}! </p>} */}
        {/* displaying the winner in the UI if there is a winner, this will show a message with the symbol of the winning player when a winning combination is met. */}

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {/* // using the GameOver component to display the game over message and the winner. */}
        {/* added onRestart prop to GameOver component to pass the handleRestart function, this will allow the GameOver component to call the handleRestart function when the "Rematch!" button is clicked, resetting the game state and allowing players to start a new game. */}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        {/* //replacing turns prop with board prop to pass the gameTurns state as board prop to GameBoard component. */}
      </div>
      {/* //LOG COMPONENT */}
      <Log turns={gameTurns} players={players} />
      {/* // passing gameTurns state as turns prop to Log component to let it know which squares have been selected and by which player, this will be used to display the log of moves in the Log component. */}
    </main>
  );
}

export default App;
