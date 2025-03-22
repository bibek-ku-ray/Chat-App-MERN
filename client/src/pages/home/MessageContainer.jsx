import React from "react";
import User from "./User";
import { IoSend } from "react-icons/io5";
import Message from "./Message";

const MessageContainer = () => {
    return (
        <div className="h-screen w-8/12 px-3 py-4 flex flex-col">
            <div className="border-b border-zinc-600 pb-2">
                <User />
            </div>
            <Message />
            <div className="w-full flex justify-between gap-1">
                <input
                    type="text"
                    placeholder="Type here..."
                    className="input w-full"
                />
                <button className="btn">
                    Like
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default MessageContainer;
