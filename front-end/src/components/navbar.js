import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import RoomPreferencesRoundedIcon from '@mui/icons-material/RoomPreferencesRounded';
import SettingsBrightnessRoundedIcon from '@mui/icons-material/SettingsBrightnessRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import 'boxicons';

export function NavBar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Convert the useEffect callback to be non-async and use .then() for handling promises
        fetch("api/v1/users/myIdentity")
            .then(response => {
                if (!response) {
                    console.log("no response");
                    return;
                }
                return response.json();
            })
            .then(content => {
                console.log(content.status);
                if (content && content.status === "loggedin") {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(error => {
                console.error('Error fetching identity:', error);
            });
    }, []);  // Add an empty dependency array to avoid infinite loop

    const handleLoginLogout = () => {
        try {
            if (isLoggedIn) {
                window.location.href = "/signout";
            } else {
                window.location.href = "/signin";
            }
        } catch (error) {
            console.log("error: ", error);
        }
    }


    return (
        <div>
            <div className="sidebar">
                <div className="top">
                    <div className="logo">
                        <NavLink to="/home">
                            <img 
                                src={require('../../src/images/tomato.png')} 
                                className="tomato-logo"
                                alt="Garden Time Logo" />
                            <span>Garden Time</span>
                        </NavLink>
                    </div>
                </div>
                <ul>
                    <li>
                        <NavLink to="/home">
                            <div className="route-row">
                                <HomeRoundedIcon style={{fontSize: 30}}></HomeRoundedIcon>
                                <span className="nav-item">Home</span>
                            </div>
                        </NavLink>
                        <span className="tooltip">Home</span>
                    </li>
                    <li>
                        <NavLink to="/tasks">
                            <div className="route-row">
                                <AssignmentRoundedIcon style={{fontSize: 26}}></AssignmentRoundedIcon>
                                <span className="nav-item">Tasks</span>
                            </div>
                        </NavLink>
                        <span className="tooltip">Tasks</span>
                    </li>
                    <li>
                        <NavLink to="/settings">
                            <div className="route-row">
                                <RoomPreferencesRoundedIcon style={{fontSize: 28}}></RoomPreferencesRoundedIcon>
                                <span className="nav-item">Settings</span>
                            </div>
                        </NavLink>
                        <span className="tooltip">Settings</span>
                    </li>
                    
                    {/* <li>
                        <a href="#">
                            <box-icon name='sun' ></box-icon>
                            <SettingsBrightnessRoundedIcon style={{fontSize: 20}}></SettingsBrightnessRoundedIcon>
                            <span className="nav-item">Light mode</span>
                        </a>
                        <span className="tooltip">Light mode</span>
                    </li> */}
                    <li>
                        <NavLink to="/logout" onClick={handleLoginLogout}>
                            <div className="route-row">
                                <LogoutRoundedIcon style={{fontSize: 24}}></LogoutRoundedIcon>
                                <span className="nav-item">
                                {isLoggedIn ? 'Log out' : 'Login'}</span>
                                {/* TODO: Figure out logic so that icons match state of Login */}
                            </div>
                        </NavLink>
                        <span className="tooltip"></span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
