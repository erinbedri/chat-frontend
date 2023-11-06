import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useFetchRecepient } from "../../hooks/useFetchRecipient";

export default function UserChat(chat, user) {
    const { recipientUser } = useFetchRecepient(chat, user);

    return (
        <div key={chat._id} className="chat-item">
            <div className="chat-icon">
                <FontAwesomeIcon icon={faUser} />
            </div>

            <div className="chat-info">
                <div>
                    <p>
                        <b>{recipientUser?.email}</b>
                    </p>
                    <p>message here...</p>
                </div>

                <div className="chat-time">11:56</div>
            </div>

            <div className="chat-live"></div>
            <div className="chat-notification">3</div>
        </div>
    );
}
