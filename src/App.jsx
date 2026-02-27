import { useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

export default function App() {
  // function generateNewDice() {
  //   const numArray = [];
  //   for (let i = 0; i < 10; i++) {
  //     let randNum = Math.ceil(Math.random() * 6)
  //     numArray.push(randNum)
  //   }
  //   return numArray;
  // }
  const [dice, setDice] = useState(generateNewDice());

  // diff approach to get array
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
    console.log(id)
  }

  function toggle () {
  
  }
  
  function handleClick() {
    setDice(generateNewDice());
  }

  return (
    <>
      <main>
        <div className="dice-container">{diceElements}</div>

        <button className="roll-Btn" onClick={handleClick}>
          Roll
        </button>
      </main>
    </>
  );
}
