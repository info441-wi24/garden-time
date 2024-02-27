import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import "./css/style.css";

function App() {
  return (
    <div className="App">
      <Routes>
      
        <Route path="/journey" element={
          <>
            {/* put components here */
              <Image/>
            }
          </>
        } />

      </Routes>
    </div>
  );
}

export default App;
