import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LogIn(props) {
    const navigate = useNavigate();

    const handleLogIn = async () => {
        try {
            const response = await fetch('/signin', {
                method: 'GET',
                credentials: 'include'
            });
          
            if (response.ok) {
                console.log('Login successful');
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleContinueWithoutAccount = () => {
        navigate('home');
    };
    
    return (
        <div className='intro'>
            <h1>NUTURE YOUR PRODUCTIVITY WITH GARDEN TIME</h1>
            <div className='login'>
                <button className='ms' onClick={handleLogIn}>Login with Microsoft</button>
                <p>OR</p>
                <button className='ms' onClick={handleContinueWithoutAccount}>Continue Without Account</button>
            </div>
        </div>
    );
};
    
export default LogIn;
