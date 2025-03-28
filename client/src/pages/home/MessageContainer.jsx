import React from "react";
import User from "./User";
import { IoSend } from "react-icons/io5";
import Message from "./Message";
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser } = useSelector((state) => state.user);
    console.log("selected user: ", selectedUser);

    return (
        <>
            {selectedUser && (
                <div className="h-screen w-8/12 px-3 py-4 flex flex-col">
                    <div className="border-b border-zinc-600 pb-2">
                        <User
                            fullName={selectedUser?.fullName}
                            username={selectedUser?.username}
                            avatar={selectedUser?.avatar}
                        />
                    </div>
                    <Message />
                    <div className="w-full flex justify-between gap-1">
                        <input
                            type="text"
                            placeholder="Type here..."
                            className="input w-full"
                        />
                        <button className="btn bg-slate-900">
                            Send
                            <IoSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageContainer;
