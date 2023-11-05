import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

import { useGlobalContext } from "../../context";
import "./navigation.css";

export default function Navigation() {
    const { user, logoutUser } = useGlobalContext();

    const [isActive, setActive] = useState("");

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
                        <NavLink className="link-light" to="/profile">
                            <p>Profile</p>
                        </NavLink>
                        <p className="link-light" onClick={logoutUser}>
                            Logout
                        </p>
                    </>
                ) : (
                    <>
                        <NavLink className="link-light" to="/login">
                            <p onClick={() => setActive("")}>Login</p>
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
