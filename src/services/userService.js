const rootUrl = "http://localhost:5000";

export const getAllUsers = async (id) => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/users`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            let message = "An error occured...";

            if (data?.message) {
                message = data.message;
            }

            return { error: true, message };
        }

        return data;
    } catch (error) {
        console.log(error);
        return { error: true, error };
    }
};

export const getUser = async (id) => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/users/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            let message = "An error occured...";

            if (data?.message) {
                message = data.message;
            }

            return { error: true, message };
        }

        return data;
    } catch (error) {
        console.log(error);
        return { error: true, error };
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

        const data = await response.json();

        if (!response.ok) {
            let message = "An error occured...";

            if (data?.msg) {
                message = data.msg;
            }

            return { error: true, message };
        }

        return data;
    } catch (error) {
        console.log(error);
        return { error: true, error };
    }
};
