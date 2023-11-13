import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import UserChat from "./UserChat";
import PotentialChat from "./PotentialChat";
import Navigation from "../../components/Navigation/Navigation";

import "./chat.css";

export default function Chat() {
    const { user } = useAuthContext();
    const {
        userChats,
        isUserChatLoading,
        userChatsError,
        potentialChats,
        isPotentialChatLoading,
        potentialChatsError,
    } = useChatContext();

    console.log(potentialChats);
    return (
        <>
            <Navigation />

            <div className="container chats-container">
                <div className="chats-potential">
                    {isPotentialChatLoading && <p>Loading potential chats...</p>}

                    {potentialChats?.map((u) => (
                        <PotentialChat key={u._id} user={u} />
                    ))}
                </div>

                <div className="chats-field">
                    <div className="chats-list">
                        {isUserChatLoading && <p>Loading chats...</p>}

                        {userChats?.map((chat) => (
                            <UserChat key={chat._id} chat={chat} user={user} />
                        ))}
                    </div>
                    <div className="chat-box">chat</div>
                </div>
            </div>
        </>
    );
}
