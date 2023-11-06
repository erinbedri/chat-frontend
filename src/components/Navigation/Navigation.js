import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";

import { useAuthContext } from "../../contexts/AuthContext";
import "./navigation.css";

export default function Navigation() {
    const { user, logoutUser } = useAuthContext();

    return (
        <div id="navigation">
            <div className="navigation-logo">
                <NavLink className="link-light" to="/">
                    <FontAwesomeIcon icon={faComments} />
                </NavLink>
            </div>

            <div className="navigation-controls">
                {user ? (
                    <>
                        <NavLink to="/chats" className="link-light">
                            Chats
                        </NavLink>

                        <NavLink to="/profile" className="link-light">
                            Profile
                        </NavLink>

                        <p className="link-light" onClick={logoutUser}>
                            Logout
                        </p>
                    </>
                ) : (
                    <>
                        <NavLink className="link-light" to="/login">
                            <p>Login</p>
                        </NavLink>

                        <NavLink className="link-light" to="/register">
                            <p>Register</p>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}
