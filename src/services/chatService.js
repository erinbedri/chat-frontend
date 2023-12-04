const rootUrl = process.env.REACT_APP_ROOT_URL;

export const getAllChats = async () => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/chats`, {
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

export const createChat = async (id) => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/chats`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                memberId: id,
            }),
        });

        console.log(response);

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
