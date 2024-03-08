import React, { useState, useEffect } from 'react';
import { NavBar } from './navbar';

export function Tasklist(props) {
    
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTask, setNewTask] = useState('');
    const [tagsList, setTagsList] = useState([]);


    const [currentTag, setCurrentTag] = useState('Not Started');
    const [customTag, setCustomTag] = useState('');
    const [showCustomTagInput, setShowCustomTagInput] = useState(false);


    const [currentTaskTag, setCurrentTaskTag] = useState('');
    const [customTaskTag, setCustomTaskTag] = useState('');
    const [showCustomTaskTagInput, setShowCustomTaskTagInput] = useState(false);

    


    // calls fetch tasks and fetch tags first when the page loads
    useEffect(async ()=>{
        await fetchTags();
        await fetchTasks();
    },[]);
    
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
        console.log("setting custom tag input");
        setCustomTag(e.target.value);
        setShowCustomTagInput(true);
      };

      
      let handleCustomBlur = (e) => {
        setCurrentTag(customTag);
        console.log(currentTag);
        setShowCustomTagInput(false);
      };

      let editTaskTag = async (taskId) => {
        // add the new tag to all of the user tags if needed 
        console.log("EDITING TASK TAG");
        await fetch('/api/v1/tasks/tag', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({tag: currentTaskTag, id: taskId}),
        });

        // add the new tag to all of the user tags if needed 
        await fetch('/api/v1/users/tag', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({tag: currentTag}),
        });
        console.log("after post to users/tag")
        

      }

      let handleCustomTaskTag = (e) => {
        console.log("setting custom tag input");
        setCustomTaskTag(e.target.value);
        setShowCustomTaskTagInput(true);
      };

      
      let handleCustomTaskTagBlur = (e) => {
        setCurrentTaskTag(customTag);
        setShowCustomTaskTagInput(false);
      };
    
    
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <div className="taskbar-container">
          <div className="card">
            <h3>Task List</h3>
              <div className="card-body">
              <div className="tag-input">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter task..."
                />
                <select
                  value={currentTag}
                  onChange={(e) => {
                    const selectedTag = e.target.value;
                    setCurrentTag(selectedTag);
                    if (selectedTag === 'custom') {
                      setShowCustomTagInput(true);
                    } else {
                      setCustomTag('');
                    }
                  }
                }>
                {tagsList.map((tag, tagIndex) => (
                  <option key={tagIndex} value={tag}>
                      {tag}
                  </option>
                ))}
                  <option value={"custom"}>Input custom tag..</option>
                  </select>
                  {showCustomTagInput && (
                    <div className="custom-tag-popup">
                      <input
                        type="text"
                        onChange={handleCustomTag}
                        onBlur={handleCustomBlur}
                        placeholder="Type your own tag"
                      />
                    </div>
                  )}
                  <button className="add-task" onClick={handleAddTask}>Add Task</button>
                </div>
                <div className="task-text">
                  {isLoading ? (
                      <p>Loading...</p>
                  ) : (
                      tasks.length !== 0 ? (
                        <ul className="task-list">
                        {tasks.map((task, index) => (
                            <li key={index}>
                              <input type="checkbox" id={`task-${index}`} onClick={() => {handleCheckboxClick(task.taskId)}}/>
                              <label htmlFor={`task-${index}`}>{task.description}</label>
                              <select
                                value={task.tag}
                                onChange={(e) => {
                                  const selectedTag = e.target.value;
                                  console.log(selectedTag);
                                  setCurrentTaskTag(selectedTag);
                                  editTaskTag(task._id);
                                  if (selectedTag === 'custom') {
                                    setShowCustomTaskTagInput(true);
                                  } else {
                                    setCustomTaskTag('');
                                  }
                                }}
                                className='text-dark'
                              >
                                {tagsList.map((tag, tagIndex) => (
                                    <option key={tagIndex} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                                <option value={"custom"}>Input custom tag..</option>
                              </select>
                              {showCustomTaskTagInput && (
                                <div className="custom-tag-popup">
                                  <input
                                    type="text"
                                    value={customTaskTag}
                                    onChange={handleCustomTaskTag}
                                    onBlur={handleCustomTaskTagBlur}
                                    placeholder="Type your own tag"
                                  />
                                </div>
                              )}
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
      </div>
    );
}

export default Tasklist;