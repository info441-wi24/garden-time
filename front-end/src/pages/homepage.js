import {React, useEffect, useState} from 'react'
import PomodoroTimer from '../components/PomodoroTimer.js';
import WebPlayback from '../components/WebPlayback.js';



export function Home(props) {
    window.scrollTo(0, 0);

    const [token, setToken] = useState('');

    useEffect(() => {

        async function getToken() {
            const response = await fetch('/auth/token');
            const json = await response.json();
            setToken(json.access_token);
        }

        getToken();

    }, []);
    
    
    return (
        <div className="Homepage">
            <PomodoroTimer/>
            { (token === undefined) ? <Login/> : <WebPlayback token={token} /> }
        </div>
    ); 

}

function Login() {
    return (
        <div>
            <header className="App-header">
                <a className="spotify-login btn-spotify" href="http://localhost:3000/auth/login" >
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}
export default Home;
