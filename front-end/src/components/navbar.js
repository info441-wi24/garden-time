import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

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
            <Navbar variant="null" className="nav-bar">
                <Nav>
                    <NavLink className="nav-item" to="/home">Home</NavLink>
                    <NavLink className="nav-item" to="/tasks">Tasks</NavLink>
                    <NavLink className="nav-item" to="/" onClick={handleLoginLogout}>
                        {isLoggedIn ? 'LogOut' : 'LogIn'}
                    </NavLink>
                </Nav>
            </Navbar>
        </div>
    );
}
