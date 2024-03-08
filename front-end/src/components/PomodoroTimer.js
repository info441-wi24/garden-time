import React, { useState, useEffect } from 'react';
import { NavBar } from './navbar';

export function PomodoroTimer(props) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [status, setStatus] = useState('Start');
  const [shouldShowTimer, setTimerDisplay] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert("Nice work! Time to take a break!");
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleActivation = () => {
    setIsActive(!isActive);
    setStatus((isActive) ? "Resume" : "Pause");
    if (shouldShowTimer == true) {
      setTimerDisplay(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setStatus('Start');
    setTime(initialTime);
    setTimerDisplay(true);
  };

  const changeBreakTimer = () => {
    const breakTime = 5 * 60;
    setTime(breakTime);
    setInitialTime(breakTime);
  }

  const changePomodoroTimer = () => {
    const pomodoroTime = 25 * 60;
    setTime(pomodoroTime);
    setInitialTime(pomodoroTime);
  }

  const handleChangeTime = (event) => {
    const newTime = event.target.value * 60;
    setTime(newTime);
    setInitialTime(newTime);
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="container">
        <div className="above-timer">
          <button className="pomodoro" onClick={changePomodoroTimer}>Reset</button>
          <button className="break-time" onClick={changeBreakTimer}>Break Time</button>
        </div>
        <div className="timer-container">
          <div className="timer-text">
            {`${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
          </div>
        </div>
        <div className={(shouldShowTimer) ? "time-input" : "hide time-input"}>
          <input
            className="time-input-min"
            type="number"
            value={time / 60}
            onChange={handleChangeTime}
            min="1"
            max="180"
            step="1"
          />
          <p className="minutes">minutes</p>
        </div>
        <div className="below-timer">
          <button className="start" onClick={handleActivation}>{status}</button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
