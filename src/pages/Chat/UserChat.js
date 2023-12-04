import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useChatContext } from "../../contexts/ChatContext";
import { useFetchRecepient } from "../../hooks/useFetchRecipient";
import { useFetchLastMessage } from "../../hooks/useFetchLastMessage";

export default function UserChat({ chat, user }) {
    const { recipientUser } = useFetchRecepient(chat, user);
    const { lastMessage } = useFetchLastMessage(chat);

    const { onlineUsers, notifications } = useChatContext();

    const isOnline = onlineUsers?.some((u) => recipientUser?._id === u.userId);

    const countNotifications = notifications.filter(
        (notification) => notification.senderId === recipientUser?._id
    ).length;

    console.log(lastMessage);

    return (
        <div key={chat._id} className="chat-item">
            <div className="chat-icon">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="chat-info">
                <p>
                    <b>{recipientUser?.email}</b>
                </p>

                <div>
                    <div>
                        {lastMessage?.text && lastMessage.text.length > 25
                            ? `${lastMessage.text.slice(0, 25)}...`
                            : lastMessage.text}
                    </div>
                    <div className="chat-time">
                        {lastMessage ? new Date(lastMessage.createdAt).toLocaleString("en-DE") : null}
                    </div>
                </div>
            </div>

            {isOnline ? <div className="chat-live"></div> : ""}
            {countNotifications > 0 && <div className="chat-notification">{countNotifications}</div>}
        </div>
    );
}
