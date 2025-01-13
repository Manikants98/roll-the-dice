import { useEffect, useState } from "react";
import "./App.css";
import classNames from "classnames";
interface Dice {
  index: number;
  value: number;
}

function App() {
  const [roll, setRoll] = useState(0);
  const [dices, setDices] = useState<Dice[]>([]);
  const [selected, setSelected] = useState<Dice[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [time, setTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const handleRoll = () => {
    setRoll(roll + 1);
  };

  const handleSelectDice = (i: Dice) => {
    if (!selected?.includes(i)) {
      setSelected([...selected, i]);
    } else {
      setSelected(selected?.filter((j) => j.index !== i.index));
    }
    if (
      selected?.length === 9 &&
      selected.every((i) => i.value === selected[0].value)
    ) {
      setIsWon(true);
      setTimeTaken(time);
    }
  };

  const handleNewGame = () => {
    setRoll(0);
    setTime(0);
    setTimeTaken(0);
    setSelected([]);
    setIsWon(false);
  };

  useEffect(() => {
    setDices(() => {
      return Array.from({ length: 10 }).map((_, index) => {
        if (selected?.some((i) => i.index === index)) {
          return {
            index: index,
            value: selected?.find((i) => i.index === index)?.value || 0,
          };
        } else {
          return {
            index: index,
            value: Math.floor(Math.random() * 6) + 1,
          };
        }
      });
    });
  }, [roll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="h-screen w-screen flex justify-center bg-blue-900 items-center">
      {isWon ? (
        <div className="flex flex-col font-bold rounded-lg items-center justify-center p-5 gap-8 w-11/12 lg:w-[550px] bg-white h-96">
          <p className="text-3xl">Congratulations!</p>
          <div className="flex items-center flex-col gap-1">
            <p> Rolled: {roll}</p>
            <p>Time Taken: {timeTaken} Seconds</p>
          </div>

          <p className="text-xl"> Your Score: {roll * 100}</p>
          <button
            className="p-1 whitespace-nowrap w-32 text-white rounded bg-blue-600"
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
      ) : (
        <div className="flex flex-col rounded-lg items-center p-5 gap-8 lg:w-[550px] w-11/12 bg-white h-96">
          <div className="flex flex-col gap-3 items-center">
            <p className="text-3xl font-bold">Roll The Dice</p>
            <p className="text-center">
              Roll untill the dice are same. click each dice to freeze it. as
              its current value between rolls
            </p>
          </div>

          <div className="grid gap-8 lg:gap-10 grid-cols-5">
            {dices?.map((i, index) => {
              return (
                <button
                  className={classNames(
                    "text-xl font-bold rounded shadow size-7",
                    selected?.map((i) => i.index).includes(index)
                      ? "bg-green-200"
                      : "bg-gray-100"
                  )}
                  key={index}
                  onClick={() => handleSelectDice(i)}
                >
                  {i.value}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 items-center">
            <button
              className="p-1 text-white rounded bg-blue-600 w-20"
              onClick={handleRoll}
            >
              Roll
            </button>

            <p>Rolls Count : {roll}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
