import React, { useContext, useState, useEffect } from "react";

import { logout } from "./services/authService";

const AppContext = React.createContext();
const rootUrl = "http://localhost:5000";

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveUser = (user) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(`${rootUrl}/api/v1/users/showMe`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
            });

            const data = await response.json();
            saveUser(data.user);
        } catch (error) {
            removeUser();
        }
        setIsLoading(false);
    };

    const logoutUser = async () => {
        try {
            await logout();
            removeUser();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

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

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider };
