import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";
import { useState } from "react";

const SendMessage = () => {
    const { selectedUser } = useSelector((state) => state.user);
    const [message, setMessage] = useState("")

    const dispatch = useDispatch();

    const handleSendMessage = () => {
        if(!message.trim()) return
        dispatch(sendMessageThunk({ receiverId: selectedUser.id, message}))
        setMessage("")
    };

    return (
        <div className="w-full flex justify-between gap-1">
            <input
                type="text"
                placeholder="Type here..."
                className="input w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage();
                    }
                }}
            />
            <button
                onClick={handleSendMessage}
                className="btn bg-slate-900"
            >
                Send
                <IoSend />
            </button>
        </div>
    );
};

export default SendMessage;
