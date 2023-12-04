import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useChatContext } from "../../contexts/ChatContext";
import { useFetchRecepient } from "../../hooks/useFetchRecipient";

export default function UserChat({ chat, user }) {
    const { recipientUser } = useFetchRecepient(chat, user);
    const { onlineUsers, notifications } = useChatContext();

    const isOnline = onlineUsers?.some((u) => recipientUser?._id === u.userId);

    const countNotifications = notifications.filter(
        (notification) => notification.senderId === recipientUser?._id
    ).length;

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

            {isOnline ? <div className="chat-live"></div> : ""}
            {countNotifications > 0 && <div className="chat-notification">{countNotifications}</div>}
        </div>
    );
}
