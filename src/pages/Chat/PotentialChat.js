import React from "react";

import { useChatContext } from "../../contexts/ChatContext";

export default function PotentialChat({ user }) {
    const { createNewChat, onlineUsers } = useChatContext();

    const isOnline = onlineUsers?.some((u) => u.userId === user._id);

    return (
        <div className="potential-element" onClick={() => createNewChat(user._id)}>
            <span>{user.email}</span>
            {isOnline ? <div className="chat-live"></div> : ""}
        </div>
    );
}
