import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import 'boxicons';

export function NavBar(props) {

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
                        <NavLink to="/logout">
                            <box-icon name='log-out' ></box-icon>
                            <span className="nav-item">Logout</span>
                        </NavLink>
                        <span className="tooltip">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
        // <div>
        //     <Navbar variant="null" className="nav-bar">
        //         <Nav>
        //             <NavLink className="nav-item" to="/home">Home</NavLink>
        //             <NavLink className="nav-item" to="/tasks">Tasks</NavLink>
        //             <NavLink className="nav-item" to="/">LogIn</NavLink>
        //          </Nav>
        //     </Navbar>
        // </div>
    );
}