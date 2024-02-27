import React, { useState, useEffect } from 'react';
import { NavBar } from './navbar';

export function PomodoroTimer(props) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [status, setStatus] = useState('Start');

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
      alert("Time to take a break!");
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleActivation = () => {
    setIsActive(!isActive);
    setStatus((isActive) ? "Resume" : "Pause");
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div className="timer">{`${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}</div>
      <button className="start" onClick={handleActivation}>{status}</button>
      <button className="reset" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;