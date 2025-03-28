import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ fullName, username, avatar, id }) => {
    const dispatch = useDispatch();

    const handleClickHandler = () => {
        dispatch(setSelectedUser({ fullName, username, avatar, id }));
    };

    const {selectedUser} = useSelector((state) => state.user)

    return (
        <div
            onClick={handleClickHandler}
            className={`flex  py-1 gap-1 my-1.5 hover:bg-[#181c1c] cursor-pointer ${
                username === selectedUser?.username && "bg-[#181c1c]"
            }`}
        >
            <div className="avatar avatar-online">
                <div className="w-14 h-14 rounded-full">
                    <img src={avatar} />
                </div>
            </div>
            <div>
                <h2 className="line-clamp-1">{fullName}</h2>
                <p className="text-sm text-slate-400">{username}</p>
            </div>
        </div>
    );
};

export default User;
