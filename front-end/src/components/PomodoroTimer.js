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
      // alert("Time to take a break!");
      showNotification();
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

  const showNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(
        function(permission) {
          if (permission === "granted") {
            const notification = new Notification("Your plant has grown!", {
              body: "Time to take a break!",
            });
            document.addEventListener("visibilitychange", () => {
              if (document.visibilityState === "visible") {
                notification.close();
              }
            });
          } else if (permission === "denied" || permission === "default") {
            window.location.href = "/settings";
          }
        }
      );
    }

    const n = new Notification("Your plant has grown!");
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        n.close();
      };
    })
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div className="container">
        <div className="above-timer">
          <button className="pomodoro">Pomodoro</button>
          <button className="break-time">Break Time</button>
          <button className="tag">Tag</button>
        </div>
        <div className="timer-container">
          <div className="timer-text">
            {`${Math.floor(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
          </div>
        </div>
        <div className="below-timer">
          <button className="start" onClick={handleActivation}>{status}</button>
          <button className="reset" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;