import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";

import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";

import "./navigation.css";

export default function Navigation() {
    const { user, logoutUser } = useAuthContext();
    const { notifications } = useChatContext();

    const unreadNotifications = unreadNotificationsFunc(notifications);

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
                        <p className="link-light navigation-email">{user.email}</p>

                        <div className="notification-parent">
                            <NavLink to="/chats" className="link-light">
                                Chats
                            </NavLink>
                            {unreadNotifications?.length > 0 && (
                                <span className="notification">{unreadNotifications?.length}</span>
                            )}
                        </div>

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
