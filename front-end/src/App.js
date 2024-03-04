import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Task from './pages/taskpage.js';
import LogIn from './components/LogIn.js';
import Home from './pages/homepage.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path="home" element={<Home />} />
        <Route path="tasks" element={<Task />} />
      </Routes>
    </div>
  );
}


export default App;
