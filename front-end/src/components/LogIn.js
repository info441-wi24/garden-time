import React from 'react';
import { useNavigate } from 'react-router-dom';

export function LogIn(props) {
    const navigate = useNavigate();

    const handleLogIn = async () => {
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

   
    const handleContinueWithoutAccount = () => {
        navigate('home');
    };
    
    return (
        <div className='intro'>
            <h1>NURTURE YOUR PRODUCTIVITY WITH GARDEN TIME</h1>
            <div className='login'>
                <div className="auth-login">
                    <button className='microsoft-auth' 
                        onClick={async () => {
                    await handleLogIn()
                    }}>Login with Microsoft
                    </button>
                    <button className="google-auth">Login with Google</button>
                    <button className="canvas-auth">Login with Canvas</button>
                </div>
                <p>OR</p>
                <button className='guest' onClick={handleContinueWithoutAccount}>Continue Without Account</button>
            </div>
        </div>
    );
};
    
export default LogIn;
