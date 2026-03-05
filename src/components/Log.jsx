export default function Log({ turns, players }) {
  // accepting turns prop to know which squares have been selected and by which player, this will be passed from App component later.
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {/* using js syntax `${ }` to create a unique key for each log entry based on the row and column of the selected square, this is important for React to efficiently update the list when new turns are added. */}
          {players?.[turn.player] ?? turn.player} selected {turn.square.row},
          {turn.square.col}
          {/* using turn.player to display which player made the move and turn.square.row and turn.square.col to display the row and column of the selected square in the log entry. */}
        </li>
      ))}
    </ol>
  );
}
