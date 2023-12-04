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
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET_URL);
        //const newSocket = io("http://localhost:5000");

        setSocket(newSocket);

        console.log(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (socket === null || user === null) return;

        socket.emit("addNewUser", user.userId);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket, user]);

    // send message
    useEffect(() => {
        if (socket === null) return;

        const recipientId = currentChat?.members?.find((id) => id != user?.userId);

        socket.emit("sendMessage", { ...newMessage, recipientId });
    }, [newMessage]);

    // receive message and notification
    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", (res) => {
            if (currentChat?._id !== res.chat) return;

            setMessages((prevState) => [...prevState, res]);
        });

        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members.some((id) => id === res.senderId);

            if (isChatOpen) {
                setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
            } else {
                setNotifications((prev) => [res, ...prev]);
            }
        });

        return () => {
            socket.off("getMessage");
            socket.off("getNotification");
        };
    }, [socket, currentChat]);

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

        //markNotificationsAsRead();
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

    const markNotificationsAsRead = () => {
        const modifiedNotifications = notifications?.map((notification) => {
            const chatMembers = [user.userId, notification.senderId];
            const isDesiredChat = currentChat.members.every((member) => chatMembers.includes(member));

            return isDesiredChat ? { ...notification, isRead: true } : notification;
        });

        setNotifications(modifiedNotifications);
    };

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
                newMessage,
                setNewMessage,

                onlineUsers,
                notifications,
                markNotificationsAsRead,
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
