import React from 'react';
import {Routes, Route} from 'react-router-dom';
import PomodoroTimer from './components/PomodoroTimer';
import LogIn from './components/LogIn';
import Home from './pages/homepage.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path="home" element={<PomodoroTimer />} />
        <Route path="tasks" element={<Home />} />
      </Routes>
    </div>
  );
}


export default App;