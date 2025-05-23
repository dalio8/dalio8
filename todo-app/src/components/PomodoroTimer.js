import React, { useState, useEffect } from 'react';
import '../styles/PomodoroTimer.css';

const PomodoroTimer = () => {
  const initialTime = 25 * 60; // 25 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = null;
    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
      alert('Pomodoro session finished!');
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(initialTime);
  };

  return (
    <div className="pomodoro-timer">
      <h2>Pomodoro Timer</h2>
      <div className="time-display">{formatTime(timeRemaining)}</div>
      <div className="controls">
        <button onClick={handleStart} disabled={isRunning || timeRemaining === 0}>
          Start
        </button>
        {isRunning && (
          <button onClick={handlePause}>
            Pause
          </button>
        )}
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
