import React, { useState, useEffect } from 'react';
import { NavBar } from './navbar';

export function Tasklist(props) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Function to fetch tasks from the API
        const fetchTasks = async () => {
          try {
            const response = await fetch(`/api/v1/tasks/`);
            console.log("response", response);
            if (!response.ok) {
              throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            console.log(data);
            
            setTasks(data);
            setIsLoading(false);
          } catch (error) {
            console.error(error);
            setIsLoading(false);
          }
        };
    
        fetchTasks();
      }, );


    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div className="taskbar-container">
            <div className="card">
                <h3>Task List:</h3>
                <div className="card-body">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="task-list">
                    {tasks.map((task, index) => (
                        <li key={index}>
                        <input type="checkbox" id={`task-${index}`} />
                        <label htmlFor={`task-${index}`}>{task}</label>
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            </div>
        </div>
      </div>
    );
}

export default Tasklist;