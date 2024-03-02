import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

export function NavBar(props) {
  
    return (
        <div>
            <Navbar variant="null" className="nav-bar">
                <Nav>
                    <NavLink className="nav-item" to="/">LogIn</NavLink>
                    <NavLink className="nav-item" to="/home">Home</NavLink>
                    <NavLink className="nav-item" to="/tasks">Tasks</NavLink>
                 </Nav>
            </Navbar>
        </div >
    );
}