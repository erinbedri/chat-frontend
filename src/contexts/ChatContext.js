import React, { useContext, useState, useEffect, useCallback } from "react";

import { getAllUsers } from "../services/userService";
import { getAllChats, createChat } from "../services/chatService";

const AppContext = React.createContext();

const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);

    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    const [isPotentialChatLoading, setIsPotentialChatLoading] = useState(false);
    const [potentialChatsError, setPotentialChatsError] = useState(null);

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

    const createNewChat = useCallback(async (id) => {
        const response = await createChat(id);

        if (response.error) {
            return console.log("Error creating chat", response);
        }

        setUserChats((prevState) => [...prevState, response]);
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

                createNewChat,
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
