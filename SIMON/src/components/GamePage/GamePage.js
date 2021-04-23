import React, { useState } from "react";
import { useStateValue } from "../../utlils/StateProvider";
import { Typography, Button } from "@material-ui/core";
import Bulb from "react-bulb";
import ScoreList from "../ScoreList/Scorelist";
import "./GamePage.css";

const GamePage = () => {
  const [{ name, historyScore }, dispatch] = useStateValue();
  const [score, setScore] = useState(0);
  const [bulbArray, setBulbArray] = useState([0, 0, 0, 0, 0, 0]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [counterTurns, setCounterTurns] = useState(0);
  const [round, setRound] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [buttonName, setButtonName] = useState("Start");
  const [soulutionArray, setSolutionArray] = useState([]);

  // Reloading the page
  const restartGame = () => {
    setIsEnd(false);
    setScore(0);
    setBulbArray([0, 0, 0, 0, 0, 0]);
    setCounterTurns(0);
    setRound(0);
    setButtonName("Start");
    setSolutionArray([]);
    setPlayerTurn(true);
  };

  // Runing game logic in the bulbs game
  const gameLogic = () => {
    let random = Math.floor(Math.random() * 6);
    let tempSolutionArray = soulutionArray;
    tempSolutionArray?.push(random);

    setPlayerTurn(true);

    let arrayCopy = bulbArray;
    arrayCopy[random] = 1;
    setBulbArray([...arrayCopy]);
    setTimeout(function () {
      let arrayCopy2 = bulbArray;
      arrayCopy[random] = 0;
      setBulbArray([...arrayCopy2]);
      setPlayerTurn(false);
      setCounterTurns(counterTurns + 1);
      setSolutionArray([...tempSolutionArray]);
    }, 3000);
  };
  // Checking if player clicked right and add score if he did
  // also check how much rounds player have each turn
  const checkScore = (i) => {
    //If player didnt choose right bulb game is over
    if (soulutionArray[round] !== i) {
      addScoreList();
      setIsEnd(true);
    } else if (round === 3) {
      addScoreList();
      setRound(6);
    } else {
      setRound(round + 1);
      if (round === counterTurns - 1) {
        setScore(score + 10);
        setPlayerTurn(true);
        setButtonName("Continue");
        setRound(0);
      }
    }
  };

  // Sending the new score to the list
  const addScoreList = () => {
    dispatch({
      type: "SCORE_LIST",
      item: {
        name: name,
        date: new Date().getTime(),
        currentScore: score,
      },
    });
  };

  return (
    <div>
      <div className="side-bar">
        <ScoreList />
      </div>
      <div className="game-page">
        <div>
          <Typography variant="h2">{name}</Typography>
          <Typography variant="h3">{score}</Typography>
          <h5>Best score: {historyScore[0]?.currentScore}</h5>
          {bulbArray.map((bulb, i) => (
            <div className="tool">
              {bulb ? (
                <Bulb key={i} size={20} color="yellow" />
              ) : (
                <button
                  onClick={() => checkScore(i)}
                  disabled={playerTurn || isEnd}
                >
                  <Bulb key={i} size={20} color="white" />
                </button>
              )}
            </div>
          ))}

          <br />
          <br />

          <Button
            disabled={!playerTurn}
            onClick={() => gameLogic()}
            variant="contained"
            color="primary"
          >
            {buttonName}
          </Button>
        </div>

        {/* GAME OVER AND and lost */}
        {isEnd && (
          <div>
            <h1>Oops, the game is OVER</h1>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => restartGame()}
            >
              Click here for restart
            </Button>
          </div>
        )}

        <div className="score-list"></div>
      </div>
    </div>
  );
};

export default GamePage;
<Bulb size={20} color="white" />;
