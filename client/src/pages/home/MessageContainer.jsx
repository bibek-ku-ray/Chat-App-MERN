import React, { useEffect, useRef } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
    const { selectedUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMessageThunk({ receiverId: selectedUser?.id }));
    }, [selectedUser, dispatch]);

    const { messages } = useSelector((state) => state.message);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Function to scroll to bottom
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {selectedUser && (
                <div className="h-screen w-8/12 px-3 py-4 flex flex-col">
                    <div className="border-b border-zinc-600 pb-2">
                        <User
                            key={selectedUser.id}
                            id={selectedUser.id}
                            fullName={selectedUser?.fullName}
                            username={selectedUser?.username}
                            avatar={selectedUser?.avatar}
                        />
                    </div>
                    <div
                        className="h-full overflow-y-auto custom-scrollbar"
                    >
                        {messages?.messages?.map((msg) => {
                            return (
                                <Message
                                    key={msg._id}
                                    message={msg?.message}
                                    senderId={msg?.senderId}
                                    updatedAt={msg?.updatedAt}
                                />
                            );
                        })}
                    <div ref={messagesEndRef} />
                    </div>
                    <SendMessage />
                </div>
            )}
        </>
    );
};

export default MessageContainer;
