import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message, senderId, updatedAt }) => {
    const { userProfile, selectedUser } = useSelector((state) => state.user);

    return (
        <div className="h-fit overflow-y-auto mt-2">
            <div
                className={`chat ${
                    senderId === userProfile._id ? "chat-end" : "chat-start"
                } `}
            >
                <div className="chat-image avatar ">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS chat bubble component"
                            src={
                                senderId === userProfile._id
                                    ? userProfile?.avatar
                                    : selectedUser?.avatar
                            }
                        />
                    </div>
                </div>
                <div
                    className={`chat-bubble ${
                        senderId === userProfile._id && " bg-sky-700"
                    }`}
                >
                    {message}
                </div>
                <div className="chat-footer opacity-50">
                    <time className="text-xs opacity-50">{updatedAt.split(".")[0]}</time>
                    Delivered
                </div>
            </div>
        </div>
    );
};

export default Message;
