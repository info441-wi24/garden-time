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
    
    const handleSpotifyLogin = async () => {
        try {
            console.log("trying to navigate to signin");
            // navigate('/signin');
            window.location.href = '/auth/login';
            // window.location.reload();
            
            console.log("finished signin");
            
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <header className="App-header">
                <button className="spotify-login btn-spotify" onClick={async () => {
                        await handleSpotifyLogin()}}>Login To Spotify</button>
            </header>
        </div>
    );
}
export default Home;
