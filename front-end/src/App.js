import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Task from './pages/taskpage.js';
import LogIn from './components/LogIn.js';
import Home from './pages/homepage.js';
import Setting from './pages/settingspage.js';

function App() {

 
  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path="home" element={<Home />} />
        <Route path="tasks" element={<Task />} />
        <Route path='settings' element={<Setting />}/>
      </Routes>
    </div>
  );
}


export default App;
