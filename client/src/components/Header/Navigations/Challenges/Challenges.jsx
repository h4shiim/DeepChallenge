import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./Challenges.css";
import "../Home/backgroundVideo"
import BackgroundVideo from "../Home/backgroundVideo";

const socket = io("http://localhost:3001"); // Replace with your server URL

const Challenges = () => {
  const [task, setTask] = useState("");
  const [timer, setTimer] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  const countdownRef = useRef(null);

  useEffect(() => {
    socket.on("task", (data) => {
      setTask(data.task);
      setTimer(data.timer);
      startCountdown(data.timer);
    });

    socket.on("full", () => {
      alert("Maximum number of users reached. Please try again later.");
    });

    socket.on("result", (data) => {
      setResult(data);
    });

    return () => {
      socket.off("task");
      socket.off("full");
      socket.off("result");
    };
  }, []);

  const startCountdown = (time) => {
    let remainingTime = time;
    countdownRef.current = setInterval(() => {
      remainingTime--;
      setTimer(remainingTime);
      if (remainingTime === 0) {
        clearInterval(countdownRef.current);
        setTimer(0);
        setResult({ message: "Time is up! Please try again." });
      }
    }, 1000);
  };

  const handleAnswerSubmit = () => {
    clearInterval(countdownRef.current);
    setTimer(0);
    console.log("Submitting answer: ", answer);
    socket.emit("answer", { answer });
  };
  


  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="challenges-container">
      <BackgroundVideo />
      <div className="task-box">
        <h2>Task</h2>
        <p>{task}</p>
      </div>
      <div className="answer-box">
        <h2>Answer</h2>
        <textarea
          value={answer}
          onChange={handleAnswerChange}
          placeholder="Enter your answer here"
        />
        <button onClick={handleAnswerSubmit}>Submit</button>
      </div>
      <div className="timer-box">
        {/* <h2>Time Remaining</h2> */}
        <p>{timer} seconds</p>
      </div>
      {result && (
        <div className="result-box">
          <h2>Result</h2>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default Challenges;
