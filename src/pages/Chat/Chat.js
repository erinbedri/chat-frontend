import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
    const bottomRef = useRef(null);

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

        sendTextMessage,
        setSendTextMessageError,
        setNewMessage,
    } = useChatContext();

    const { recipientUser } = useFetchRecepient(currentChat, user);

    const [text, setText] = useState("");

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [messages]);

    const changeHandler = (e) => {
        setText(e.target.value);
    };

    return (
        <>
            <Navigation />

            <div className="container chats-container">
                <div className="potential-section">
                    {isPotentialChatLoading && <p>Loading potential chats...</p>}

                    {potentialChats ? potentialChats.map((u) => <PotentialChat key={u._id} user={u} />) : <p>test</p>}
                </div>

                <div className="chats-section">
                    <div className="chats-list">
                        {isUserChatLoading && <p>Loading chats...</p>}

                        <div className="list-scrollable">
                            {userChats?.map((chat) => (
                                <div key={chat._id} onClick={() => updateCurrentChat(chat)}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {!recipientUser ? (
                        <h3>No chat selected yet...</h3>
                    ) : (
                        <div className="chat-messages">
                            <h3>Conversation with {recipientUser.email}</h3>

                            <div className="chat-scrollable">
                                {isMessagesLoading && <p>Loading messages...</p>}

                                {messages?.map((message) => (
                                    <ChatBox key={message._id} message={message} />
                                ))}

                                <div ref={bottomRef} />
                            </div>

                            <div>
                                <input
                                    className="chat-input"
                                    type="text"
                                    placeholder="Type your message here..."
                                    value={text}
                                    onChange={changeHandler}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            sendTextMessage(text, currentChat._id, setText);
                                        }
                                    }}
                                />
                                <button
                                    className="chat-send"
                                    onClick={() => sendTextMessage(text, currentChat._id, setText)}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
