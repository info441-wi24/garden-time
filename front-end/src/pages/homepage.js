import React from 'react'
import PomodoroTimer from '../components/PomodoroTimer.js';



export function Home(props) {
    window.scrollTo(0, 0);
    

    
    return (
        <div className="Homepage">
            <PomodoroTimer/>
        </div>
    ); 

}
export default Home;
