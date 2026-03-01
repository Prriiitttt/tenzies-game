import { useState, useRef, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateNewDice());
  const [rolls, setRolls] = useState(0);

  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      value={dieObj.value}
      key={dieObj.id}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      }),
    );
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      }),
    );
    setRolls((prevRoll) => prevRoll + 1);
  }

  function newGameRoll() {
    setDice(generateNewDice());
    setRolls(0);
  }

  function getRollMessage() {
    if (gameWon) {
      return rolls <= 5
        ? `Damn!! You won using ${rolls} rolls only 🐐`
        : `Took you ${rolls} rolls to win bastard 😒, you deserve less confetti!`;
    }
    return `Number of rolls : ${rolls}`;
  }

  return (
    <>
      {gameWon &&
        (rolls <= 5 ? (
          <Confetti numberOfPieces={1500} gravity={0.3} recycle={false} />
        ) : (
          <Confetti numberOfPieces={250} gravity={0.1} recycle={false} />
        ))}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          {gameWon
            ? "Hit New Game to restart."
            : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
        </p>
        <div className="dice-container">{diceElements}</div>

        <p>{getRollMessage()}</p>

        <button
          ref={buttonRef}
          className="roll-Btn"
          onClick={gameWon ? newGameRoll : rollDice}
        >
          {gameWon ? "New Game" : "Roll"}
        </button>

        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
      </main>
    </>
  );
}
