import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import UserChat from "./UserChat";
import Navigation from "../../components/Navigation/Navigation";

import "./chat.css";

export default function Chat() {
    const { user } = useAuthContext();
    const { userChats, isUserChatLoading, userChatsError } = useChatContext();

    console.log(userChats);

    return (
        <>
            <Navigation />

            <div className="container chats-container">
                <div className="chats-list">
                    {isUserChatLoading && <p>Loading chats...</p>}

                    {userChats?.map((chat) => (
                        <UserChat key={chat._id} chat={chat} user={user} />
                    ))}
                </div>

                <div className="chat-box">chat</div>
            </div>
        </>
    );
}
