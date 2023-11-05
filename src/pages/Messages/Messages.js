import React, { useState, useEffect } from "react";

import { getAllUsers } from "../../services/userService";
import Navigation from "../../components/Navigation/Navigation";

import "./messages.css";

export default function FindFriends() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await getAllUsers();

                if (response.status === 200) {
                    const data = await response.json();

                    setUsers(data.users);
                } else {
                    const message = await response.json();
                    console.log(message);
                }
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <>
            <Navigation />

            <div className="container messages-container">
                <div className="messages-list">
                    {users ? (
                        users.map((user) => (
                            <p key={user._id} className="user-item">
                                {user.email}
                            </p>
                        ))
                    ) : (
                        <p>No users found</p>
                    )}
                </div>

                <div className="chat">chat</div>
            </div>
        </>
    );
}
