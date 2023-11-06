import React, { useContext, useState, useEffect } from "react";

import { getCurrentUser } from "../services/userService";
import { logout } from "../services/authService";

const AppContext = React.createContext();
const rootUrl = "http://localhost:5000";

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.log(user);

    const saveUser = (user) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);

            const response = await getCurrentUser();

            setIsLoading(false);

            if (response.error) {
                console.log(response.message);
                return;
            }

            saveUser(response.user);
        };

        fetchUser();
    }, []);

    const logoutUser = async () => {
        try {
            await logout();
            removeUser();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                user,
                isLoading,
                saveUser,
                logoutUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AppContext);
};

export { AuthContextProvider };
