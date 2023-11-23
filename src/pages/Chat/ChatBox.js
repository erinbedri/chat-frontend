import React from "react";

import { useAuthContext } from "../../contexts/AuthContext";

export default function ChatBox({ message }) {
    const { user } = useAuthContext();

    return (
        <div className={`chat-message ${user.userId == message.sender ? "chat-sender" : "chat-recipient"}`}>
            {message.text}
            <p>{new Date(message.createdAt).toLocaleString("en-DE")}</p>
        </div>
    );
}
