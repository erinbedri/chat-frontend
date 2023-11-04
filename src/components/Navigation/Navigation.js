import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./navigation.css";

export default function Navigation() {
    const [isActive, setActive] = useState("");

    return (
        <div id="navigation">
            <div className="navigation-logo">
                <NavLink className="link-light" to="/">
                    <h2 onClick={() => setActive("")}>Chat App</h2>
                </NavLink>
            </div>

            <div className="navigation-controls">
                <NavLink className="link-light" to="/login">
                    <p>Login</p>
                </NavLink>

                <NavLink className="link-light" to="/register">
                    <p>Register</p>
                </NavLink>

                <NavLink className="link-light" to="/profile">
                    <p>Profile</p>
                </NavLink>

                <NavLink className="link-light" to="/logout">
                    <p>Logout</p>
                </NavLink>
            </div>
        </div>
    );
}
