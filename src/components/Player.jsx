import { useState } from "react"; //import use state so that we can user can edit player name and symbol and save it.

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  // added props initialName and symbol as parameters, to be used instead of hardcoded values
  // added isActive prop to highlight active player later
  // added onChangeName prop to allow parent component (App) to update player name

  const [playerName, setPlayerName] = useState(initialName); // state to hold player name, as initial value we are using the prop initialName

  // creating Array of players and saving it in 2 const variables
  const [isEditing, setIsEditing] = useState(false); //initial(default before editing) set to false, when user clicks edit button it will be set to true.

  function handleEditClick() {
    // setIsEditing(true); // initially its false, when user clicks edit button, isEditing will be set to true.
    // setIsEditing(isEditing ? false : true); // setIsEditing to false if its true, otherwise it will be  true.
    // setIsEditing(!isEditing); // toggling the isEditing state between true and false on each button click, shortform of setIsEditing(isEditing ? false : true);
    setIsEditing((editing) => !editing); // gets latest value(false), functional update form of toggling the isEditing state between true and false on each button click, setIsEditing(!isEditing); is not recommended when the new state depends on the previous state.

    if (isEditing) {
      onChangeName(symbol, playerName); // when user clicks save button, isEditing will be true, so we call onChangeName function passed as prop from App component to update the player's name in the App component's state, we pass the symbol and the new playerName as arguments to identify which player's name is being updated.
    }
  }
  function handleChange(event) {
    console.log(event.target.value); // logs the value entered in the input field
    setPlayerName(event.target.value); // updates the playerName state with the new value from the input field
  }

  let editableplayerName = <span className="player-name">{playerName}</span>; // default value of playerName is span with player name passed as prop
  //replcing name with playerName variable, and let playername variable is changed to editableplayerName.

  if (isEditing) {
    editableplayerName = (
      <input type="text" required value={playerName} onChange={handleChange} /> // input field to edit player name, value is set to playerName state, onChange calls handleChange function to update the state
    ); // when isEditing is true, playerName will be set to input field with value as name prop
  }

  return (
    <li className={isActive ? "active" : undefined}>
      {/* // added className to li element, if isActive prop is true, className will be active, otherwise undefined(no class) */}
      <span className="player">
        {/* <span className="player-name">{name}</span>    moved to PlayerName component above*/}
        {/* {playerName} using editableplayerName variable to switch between span and input field */}
        {editableplayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      {/* // when isEditing is true, button text will be Save, otherwise Edit */}
    </li>
  );
}
// Note: The hardcoded values "Player 1" and "X" should be replaced with {name} and {symbol} respectively to utilize the props passed to the component.
