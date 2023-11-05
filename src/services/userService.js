const rootUrl = "http://localhost:5000";

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/users`, {
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
