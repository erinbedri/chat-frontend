import React, { useContext, useState, useEffect } from "react";

import { getAllChats } from "../services/chatService";

const AppContext = React.createContext();

const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

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

    return (
        <AppContext.Provider
            value={{
                userChats,
                isUserChatLoading,
                userChatsError,
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
