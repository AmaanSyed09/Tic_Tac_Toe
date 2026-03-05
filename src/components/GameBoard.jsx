// import React, { useState } from "react";
//defining the initial state of the game board as a 3x3 grid with null values
//removing useState as gameBoard state is being lifted up to App component

// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ]; moved to app.jsx to keep the GameBoard component cleaner and more focused on rendering the UI.

export default function GameBoard({ onSelectSquare, board }) {
  // let gameBoard = initialGameBoard; // initializing gameBoard variable with initialGameBoard array
  // for (const turn of turns) {
  //   // for loop to iterate over each turn in the turns array, by checking the turns array passed as prop from App component to know which squares have been selected and by which player.
  //   const { square, player } = turn; // destructuring square and player to get the square object and player symbol from each turn
  //   const { row, col } = square; // destructuring row and col from square object to get the row and column indices of the selected square
  //   // updating the gameBoard variable to mark the selected squares with the respective player's symbol
  //   gameBoard[row][col] = player; // marking the square at the specified row and column with the player's symbol
  // } moved to app.jsx .

  //removed activePlayerSymbol prop from here as its not needed in this component anymore.
  // accepting prop using prop destructuring, onSelectSquare function will be passed from App component later to handle square selection, you can name it anything.
  // accepting activePlayerSymbol prop to know which player's turn it is.

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // function handleSelectSquare(rowIndex, colIndex) {
  //   //ro and col index of the selected square are passed as parameters
  //   // Function to handle square selection will be implemented here
  //   setGameBoard((prevGameBoard) => {
  //     // Logic to update the game board based on player actions

  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ]; // Create a copy of the previous game board, because state should be immutable meaning `prevGameBoard` should not be modified directly. using spread operator ... to create a shallow copy of the array.
  //     //using map to reate a copy of each old inner array to ensure a deep copy of the 2D array.
  //     // updatedBoard[rowIndex][colIndex] = "X"; // Example: Marking the square with "X"
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol; // Marking the square with the active player's symbol as determined by the activePlayerSymbol prop.
  //     return updatedBoard; // Return the updated game board
  //   });
  //   // Call the onSelectSquare prop function to notify parent component about the square selection
  //   onSelectSquare();
  // }

  // commenting out gameBoard as moving this state to App component using the gameTurns state to manage the game board state there, this is called lifting state up.

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* row, rowIndex are parameters of map function,
              rowIndex is used as key for each li element. */}
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}> */}
                {/* //removed handleSelectSquare function call from here, replaced with onSelectSquare prop function to notify parent component when a square is selected. */}
                {/* <button onClick={onSelectSquare}>{playerSymbol}</button> */}
                {/* //created anonymous function to call handleSelectSquare with rowIndex and colIndex when button is clicked */}

                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null} // disabling the button if the square is already selected by checking if playerSymbol is not null, this will prevent players from selecting an already occupied square.
                >
                  {playerSymbol}
                  {/* // using onSelectSquare prop function to handle square selection, passing rowIndex and colIndex as parameters to know which square was selected in App component's handleSelectSquare function.  */}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
