import React, { useState, useEffect } from 'react';
import { NavBar } from './navbar';

export function Tasklist(props) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const [currentTag, setCurrentTag] = useState('Not Started');

  useEffect(() => {
    const fetchTagsAndTasks = async () => {
      await fetchTags();
      await fetchTasks();
    };
    
    fetchTagsAndTasks();
  }, []);

  const fetchTags = async () => {
    try {
      const tagResponse = await fetch(`/api/v1/users/tag`);
      const tagList = await tagResponse.json();
      setTagsList(tagList);
    } catch (error) {
      console.error(error);
      setTagsList(["Not Started", "In Progress", "Completed"]);
    }
  };

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
      await fetch('/api/v1/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTask, tag: currentTag }),
      });

      setNewTask('');
      await fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxClick = async (taskId) => {
    try {
      await fetch('api/v1/tasks/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId }),
      });

      await fetchTasks();
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
                onChange={(e) => setCurrentTag(e.target.value)}
              >
                {tagsList.map((tag, index) => (
                  <option key={index} value={tag}>{tag}</option>
                ))}
              </select>
              <button className="add-task" onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="task-text">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                tasks.length > 0 ? (
                  <ul className="task-list">
                    {tasks.map(task => (
                      <li key={task.taskId}>
                        <input
                          type="checkbox"
                          id={`task-${task.taskId}`}
                          onClick={() => handleCheckboxClick(task.taskId)}
                        />
                        <label htmlFor={`task-${task.taskId}`}>{task.description}</label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You do not have any tasks!</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasklist;
