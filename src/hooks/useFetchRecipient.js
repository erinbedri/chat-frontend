import React, { useState, useEffect } from "react";

import { getUser } from "../services/userService";

export const useFetchRecepient = ({ chat, user }) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);

    const recipientId = chat?.members?.find((id) => id !== user.userId);

    useEffect(() => {
        const fetchUser = async () => {
            if (!recipientId) return null;

            const response = await getUser(recipientId);

            if (response.error) {
                return setError(response);
            }

            setRecipientUser(response);
        };

        fetchUser();
    }, []);

    return { recipientUser, error };
};
