import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./css/style.css";
import Home from './pages/homepage.js'

function App() {
  return (
    <div className="App">
      <Routes>
      
        <Route path="/" element={
          <>
            {/* put components here */
              <Home/>
            }
          </>
        } />

      </Routes>
    </div>
  );
}

export default App;
