import React from 'react'
import Tasklist from '../components/tasklist.js'



export function Home(props) {
    window.scrollTo(0, 0);
    

    
    return (
        <div className="Homepage">
            <Tasklist/>
        </div>
    ); 

}
export default Home;
