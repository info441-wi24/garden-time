import React, { useState, useEffect } from 'react';
import { NavBar } from './navbar';

export function Tasklist(props) {
    
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTask, setNewTask] = useState('');
    const [currentTag, setCurrentTag] = useState('not started');


      // Function to fetch tasks from the API
      const fetchTasks = async () => {
        try {
          const response = await fetch(`/api/v1/tasks/`);
          
          const data = await response.json();
          
          setTasks(data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      const handleAddTask = async () => {
        try {
          console.log(newTask);
          // Perform the POST request to add a new task
          console.log("before adding task fetch");
          await fetch('/api/v1/tasks/', {
            method: 'POST',
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({task:newTask}),
          });
          console.log("after adding task fetch");
        
          setNewTask('');
          await fetchTasks();
        } catch (error) {
          console.error(error);
        }
      };

      const handleCheckboxClick = async (taskId) => {
        try {
          console.log("calling delete")
          // Make a DELETE request to your server using fetch
          const response = await fetch('api/v1/tasks/', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:taskId}),
          });  
          console.log('task deleted');
          await fetchTasks()
        } catch (error) {
          console.error('Error deleting item:', error);
        }

      };

    
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div className="taskbar-container">
            <div className="card">
                <h3>Task List:</h3>
                <div className="card-body">
                <div>
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter task..."
                  />
                  <select
                      value={taskStatus}
                      onChange={(e) => setTaskStatus(e.target.value)}
                  >
                      <option value="not started">Not Started</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                  </select>
                  <button onClick={handleAddTask}>Add Task</button>
                  <button onClick={fetchTasks}>See My Tasks</button>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    tasks.length !== 0 ? (
                      <ul className="task-list">
                      {tasks.map((task, index) => (
                          <li key={index}>
                            <input type="checkbox" id={`task-${index}`} onClick={() => {handleCheckboxClick(task.taskId)}}/>
                            <label htmlFor={`task-${index}`}>{task.description}</label>
                            <select>
                              {/* Map over tags and render options */}
                              {task.tags.map((tag, tagIndex) => (
                                  <option key={tagIndex} value={tag}>
                                      {tag}
                                  </option>
                              ))}
                          </select>
                          </li>
                      ))}
                      </ul>
                    ) :

                    <p>You do not have any tasks!</p>
                    
                )}
                </div>
            </div>
        </div>
      </div>
    );
}

export default Tasklist;