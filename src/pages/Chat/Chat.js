import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthContext";
import { useChatContext } from "../../contexts/ChatContext";
import { useFetchRecepient } from "../../hooks/useFetchRecipient";
import UserChat from "./UserChat";
import PotentialChat from "./PotentialChat";
import ChatBox from "./ChatBox";
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

        messages,
        isMessagesLoading,
        messagesError,

        currentChat,
        updateCurrentChat,
    } = useChatContext();

    const { recipientUser } = useFetchRecepient(currentChat, user);

    return (
        <>
            <Navigation />

            <div className="container chats-container">
                <div className="potential-section">
                    {isPotentialChatLoading && <p>Loading potential chats...</p>}

                    {potentialChats && potentialChats.map((u) => <PotentialChat key={u._id} user={u} />)}
                </div>

                <div className="chats-section">
                    <div className="chats-list">
                        {isUserChatLoading && <p>Loading chats...</p>}

                        {userChats?.map((chat) => (
                            <div key={chat._id} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))}
                    </div>
                    <div className="chat-messages">
                        {recipientUser ? (
                            <h3>Conversation with {recipientUser.email}</h3>
                        ) : (
                            <h3>No chat selected yet...</h3>
                        )}

                        {isMessagesLoading && <p>Loading messages...</p>}

                        {messages?.map((message) => (
                            <ChatBox key={message._id} message={message} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
