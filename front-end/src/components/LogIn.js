import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LogIn(props) {
    const navigate = useNavigate();

    const handleLogInWithMicrosoft = async () => {
        try {
            console.log("trying to navigate to signin");
            // navigate('/signin');
            window.location.href = '/signin';
            // window.location.reload();
            
            console.log("finished signin");
            
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleLogInWithGoogle = async () => {
        try {
            console.log("trying to navigate to signin");
            // navigate('/signin');
            window.location.href = '/auth/google';
            // window.location.reload();
            
            console.log("finished signin");
            
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

   
    const handleContinueWithoutAccount = () => {
        navigate('home');
    };
    
    return (
        <div className='intro'>
            <h1>NURTURE YOUR PRODUCTIVITY WITH GARDEN TIME</h1>
            <div className='login'>
                <button className='ms' onClick={async () => {
                    await handleLogInWithMicrosoft()
                    }}>Login with Microsoft</button>
                <p>OR</p>
                <button className='ms' onClick={async () => {
                    await handleLogInWithGoogle()
                    }}>Login with Google</button>
                <p>OR</p>
                <button className='ms' onClick={handleContinueWithoutAccount}>Continue Without Account</button>
            </div>
        </div>
    );
};
    
export default LogIn;
