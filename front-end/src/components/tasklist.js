import React, { useState, useEffect } from 'react';
import { NavBar } from './navbar';

export function Tasklist(props) {
    
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTask, setNewTask] = useState('');
    const [currentTag, setCurrentTag] = useState('not-started'); // Initialize with default value
    const [customTag, setCustomTag] = useState('');
    const [tagsList, setTagsList] = useState([]);


    
    const fetchTags = async() => {
      try {
        const tagResponse = await fetch(`/api/v1/users/tag`)
        const tagList = await tagResponse.json(); 
        setTagsList(tagList);
      }
      catch (error) {
        console.error(error);
        setTagsList(["Not Started", "In Progress", "Completed"]);
      }
    }

      // Function to fetch tasks from the API
      const fetchTasks = async () => {
        try {
          const response = await fetch(`/api/v1/tasks/`);
          
          const data = await response.json();
          
          setTasks(data);
          setIsLoading(false);
          console.log("fetching tags");
          await fetchTags();
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };



      const handleAddTask = async () => {
        try {
        
          // Perform the POST request to add a new task
          console.log("before post to tasks")
          await fetch('/api/v1/tasks/', {
            method: 'POST',
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({task:newTask, tag: currentTag}),
          });
          console.log("after post to tasks, before post to users/tag")
          
          // add the new tag to all of the user tags if needed 
          await fetch('/api/v1/users/tag', {
            method: 'POST',
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tag: currentTag}),
          });
          console.log("after post to users/tag")
        
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
          await fetchTasks();
        } catch (error) {
          console.error('Error deleting item:', error);
        }

      };

      let handleCustomTag = (e) => {
        setCustomTag(e.target.value);
      };

      
      let handleCustomBlur = (e) => {
        setCurrentTag(customTag);
        console.log(currentTag);
      };

      let editTaskTag = async (taskId, e) => {
         // add the new tag to all of the user tags if needed 
         await fetch('/api/v1/tasks/tag', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({tag: e.target.value, id: taskId}),
        });
        
      }

      let tagOptions = () => {
        fetchTags();
        console.log("Fetching tags", tagsList);
        return (
          <span>
            <select value={currentTag}
              onChange={(e) => {
                setCurrentTag(e.target.value);
                setCustomTag('');
              }}
              className='text-dark'
            >      
              {tagsList.map((tag, tagIndex) => (
                  <option key={tagIndex} value={tag}>
                      {tag}
                  </option>
              ))}
              <option value={customTag}>Input custom tag..</option>
            </select>
            {currentTag === customTag && (
              <input
                type="text"
                value={customTag}
                onChange={handleCustomTag}
                onBlur={handleCustomBlur}
                placeholder="Type your own tag"
              />
            )}
          </span>
        
        )
      }

    
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
                  <select value={currentTag}
                    onChange={(e) => {
                      setCurrentTag(e.target.value);
                      setCustomTag('');
                    }}
                    className='text-dark'
                  >      
                    {tagsList.map((tag, tagIndex) => (
                        <option key={tagIndex} value={tag}>
                            {tag}
                        </option>
                    ))}
                    <option value={customTag}>Input custom tag..</option>
                  </select>
                  {currentTag === customTag && (
                    <input
                      type="text"
                      value={customTag}
                      onChange={handleCustomTag}
                      onBlur={handleCustomBlur}
                      placeholder="Type your own tag"
                    />
                  )}
                  <br/>
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