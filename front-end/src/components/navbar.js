import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
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
                            <box-icon name='home-circle' ></box-icon>
                            <span className="nav-item">Home</span>
                        </NavLink>
                        <span className="tooltip">Home</span>
                    </li>
                    <li>
                        <NavLink to="/tasks">
                            <box-icon name='task' ></box-icon>
                            <span className="nav-item">Tasks</span>
                        </NavLink>
                        <span className="tooltip">Tasks</span>
                    </li>
                    <li>
                        <NavLink to="/settings">
                            <box-icon name='cog' ></box-icon>
                            <span className="nav-item">Settings</span>
                        </NavLink>
                        <span className="tooltip">Settings</span>
                    </li>
                    
                    {/* <li>
                        <a href="#">
                            <box-icon name='sun' ></box-icon>
                            <span className="nav-item">Light mode</span>
                        </a>
                        <span className="tooltip">Light mode</span>
                    </li> */}
                    <li>
                        <NavLink to="/logout" onClick={handleLoginLogout}>
                            <box-icon name='log-out' ></box-icon>
                            <span className="nav-item">Logout</span>
                            {isLoggedIn ? 'LogOut' : 'LogIn'}
                        </NavLink>
                        <span className="tooltip">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
        //     <Navbar variant="null" className="nav-bar">
        //         <Nav>
        //             <NavLink className="nav-item" to="/home">Home</NavLink>
        //             <NavLink className="nav-item" to="/tasks">Tasks</NavLink>
        //             <NavLink className="nav-item" to="/" onClick={handleLoginLogout}>
        //                 {isLoggedIn ? 'LogOut' : 'LogIn'}
        //             </NavLink>
        //         </Nav>
        //     </Navbar>
        // </div>
    );
}
