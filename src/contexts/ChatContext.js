import React, { useContext, useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

import { getAllUsers } from "../services/userService";
import { getAllChats, createChat } from "../services/chatService";
import { getMessages, createMessage } from "../services/messageService";

const AppContext = React.createContext();

const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    const [potentialChats, setPotentialChats] = useState([]);
    const [isPotentialChatLoading, setIsPotentialChatLoading] = useState(false);
    const [potentialChatsError, setPotentialChatsError] = useState(null);

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:5000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (socket === null || !user) return;

        socket.emit("addNewUser", user.userId);
    }, [socket]);

    useEffect(() => {
        const getUsers = async () => {
            setIsPotentialChatLoading(true);
            setPotentialChatsError(null);

            const response = await getAllUsers();

            setIsPotentialChatLoading(false);

            if (response.error) {
                return setPotentialChatsError(response);
            }

            const pChats = response.filter((user) => {
                let isChatCreated = false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] == user._id || chat.members[1] == user._id;
                    });
                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
        };

        getUsers();
    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?.userId) {
                setIsUserChatLoading(true);
                setUserChatsError(null);

                const response = await getAllChats();

                setIsUserChatLoading(false);

                if (response.error) {
                    return setUserChatsError(response);
                }

                setUserChats(response);
            }
        };

        getUserChats();
    }, [user]);

    useEffect(() => {
        const getChatMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getMessages(currentChat?._id);

            setIsMessagesLoading(false);

            if (response.error) {
                return setMessagesError(response);
            }

            setMessages(response);
        };

        getChatMessages();
    }, [currentChat]);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createNewChat = useCallback(async (id) => {
        const response = await createChat(id);

        if (response.error) {
            return console.log("Error creating chat", response);
        }

        setUserChats((prevState) => [...prevState, response]);
    }, []);

    const sendTextMessage = useCallback(async (textMessage, currentChatId, setTextMessage) => {
        if (!textMessage) return;

        const response = await createMessage(currentChatId, textMessage);

        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prevState) => [...prevState, response]);
        setTextMessage("");
    }, []);

    return (
        <AppContext.Provider
            value={{
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

                createNewChat,
                updateCurrentChat,

                sendTextMessage,
                setSendTextMessageError,
                setNewMessage,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useChatContext = () => {
    return useContext(AppContext);
};

export { ChatContextProvider };
