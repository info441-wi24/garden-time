import React from 'react'
import Tasklist from '../components/tasklist.js'



export function Task(props) {
    window.scrollTo(0, 0);
    

    
    return (
        <div className="taskpage">
            <Tasklist/>
        </div>
    ); 

}
export default Task;