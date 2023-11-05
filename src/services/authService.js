const rootUrl = "http://localhost:5000";

export const login = async (email, password) => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return response;
    } catch (err) {
        console.error(err);
    }
};

export const register = async (email, password) => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        return response;
    } catch (err) {
        console.error(err);
    }
};

export const logout = async () => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/auth/logout`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        return response;
    } catch (err) {
        console.error(err);
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/users/showMe`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        return response;
    } catch (err) {
        console.error(err);
    }
};
