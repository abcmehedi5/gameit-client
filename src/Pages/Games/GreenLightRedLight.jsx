// src/GreenLightRedLight.js
import React, { useState, useEffect, useContext } from "react";
import useToast from "../../Hooks/useToast";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProvider";
import useSingleUser from "../../Hooks/useSingleUser";

const GreenLightRedLight = () => {
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [boxColor, setBoxColor] = useState("red");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40); // Adjust for different difficulty levels
  const [targetScore, setTargetScore] = useState(10); // Adjust for different difficulty levels
  const [successAlert, errorAlert] = useToast();

  const { user } = useContext(AuthContext);
  // user data custom hook
  const [userData] = useSingleUser();
  useEffect(() => {
    let interval;

    if (isGameRunning) {
      interval = setInterval(() => {
        // Change the box color randomly between green and red
        setBoxColor(Math.random() < 0.5 ? "green" : "red");
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000 + Math.random() * 1000);
    } else {
      clearInterval(interval);
    }

    if (timeLeft === 0) {
      setIsGameRunning(false);
      clearInterval(interval);
      if (score >= targetScore) {
        // score save in database
        console.log(score);
        axios
          .patch("https://gameit-server.vercel.app/games/score", {
            score: score,
            email: user.email,
          })
          .then(() => {
            successAlert("Congratulations! You win!");
          })
          .catch((error) => {
            errorAlert(
              "score Cannot save because there was a server side error " + error
            );
          });

        // Player wins
      } else {
        // Player loses
        errorAlert("Game Over!");
      }
    }

    return () => clearInterval(interval);
  }, [isGameRunning, timeLeft, score, targetScore]);

  const handleStartGame = () => {
    setIsGameRunning(true);
    setBoxColor("green");
    setScore(0);
    setTimeLeft(40); // Reset the time for different difficulty levels
    // check easy difficultyLevel and  Reset the target score for different difficulty levels
    if (userData.difficultyLevel == "easy") {
      return setTargetScore(10); // Reset the target score for different difficulty levels
    }
    // check medium difficultyLevel
    if (userData.difficultyLevel == "medium") {
      return setTargetScore(15);
    }

    // check high difficultyLevel
    if (userData.difficultyLevel == "hard") {
      return setTargetScore(25);
    }
  };

  const handleBoxClick = () => {
    if (boxColor === "green" && isGameRunning) {
      setScore((prevScore) => prevScore + 1);
      setBoxColor("red");
    }
  };

  return (
    <div
      className="container mx-auto mt-10 text-center h-[80vh] flex justify-center items-center"
      style={{
        backgroundImage:
          "url(https://cdn.dribbble.com/users/1252270/screenshots/5371571/bub.gif)",
        minWidth: "100%",
        backgroundPosition: "center",
      }}
    >
      <div>
        {isGameRunning ? (
          <>
            <div
              className={`w-32 h-32 mx-auto rounded-full ${
                boxColor === "green" ? "bg-green-500" : "bg-red-500"
              }`}
              onClick={handleBoxClick}
            ></div>
            <p className="text-lg mt-4">
              Score: {score}/{targetScore}
            </p>
            <p className="text-lg">Time Left: {timeLeft} seconds</p>
          </>
        ) : (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleStartGame}
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenLightRedLight;
