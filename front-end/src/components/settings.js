import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { NavBar } from './navbar';

export function Settings(props) {
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div>
            <NavBar />
          <div className="settings-body">
            <div className="settings-content">
              <h1 className="settings-header">Settings</h1>

              <div className="account">
                <h2 className="settings-subheader">Account</h2>
                <p>Sorry to see you go! We hope to see you again one day!</p>
                <p className="settings-note">Note: Deleting your account will also delete the information associated with it</p>
                <button className="delete">Delete</button>
                <button className="deactivate">Deactivate</button>
              </div>

              <div className="feedback">
                <h2 className="settings-subheader">Feedback</h2>
                <p>Please let use know how we're doing and ways that we can improve!</p>
                <p>We'd love to hear about any features you like, dislike, or wish there was.</p>
                <button className="feedback-btn">Click me for the form</button>
              </div>  
              
            </div>
          </div>
        </div>
      );
    };
    
export default Settings;
