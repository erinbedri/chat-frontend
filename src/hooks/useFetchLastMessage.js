import React, { useState, useEffect } from "react";

import { useChatContext } from "../contexts/ChatContext";
import { getMessages } from "../services/messageService";

export const useFetchLastMessage = (chat) => {
    const { newMessage, notifications } = useChatContext();

    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        const fetchLastMessage = async () => {
            const response = await getMessages(chat._id);

            if (response.error) {
                console.log(response);
            }

            const message = response[response?.length - 1];

            setLastMessage(message);
        };

        fetchLastMessage();
    }, [newMessage, notifications]);

    return { lastMessage };
};
