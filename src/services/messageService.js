const rootUrl = "http://localhost:5000";

export const getMessages = async (id) => {
    try {
        const response = await fetch(`${rootUrl}/api/v1/messages/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
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
