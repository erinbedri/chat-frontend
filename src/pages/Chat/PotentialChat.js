import React from "react";

import { useChatContext } from "../../contexts/ChatContext";

export default function PotentialChat({ user }) {
    const { createNewChat } = useChatContext();

    return (
        <div className="chat-potential" onClick={() => createNewChat(user._id)}>
            <span>{user.email}</span>
            <div className="chat-live"></div>
        </div>
    );
}
