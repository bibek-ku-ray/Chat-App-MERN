import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../store/slice/user/user.thunk";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUserThunk());
        navigate("/login");
    };

    const { allOtherUsers } = useSelector((state) => state.user);
    const { userProfile } = useSelector((state) => state.user);

    return (
        <div className="w-4/12 h-screen px-3 py-5 flex flex-col border-r border-zinc-600">
            <div className="font-bold text-lg mb-0.5">Chat App</div>
            <div className="my-1.5">
                <label className="input">
                    <IoSearchSharp />
                    <input type="search" required placeholder="Search" />
                </label>
            </div>
            <div className="h-full overflow-y-auto custom-scrollbar">
                {allOtherUsers &&
                    allOtherUsers.map((user) => (
                        <User
                            key={user?._id}
                            fullName={user?.fullName}
                            username={user?.username}
                            avatar={user?.avatar}
                        />
                    ))}
            </div>
            <div className="h-1/12  flex justify-between items-center w-full py-1">
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                        <img src={userProfile?.avatar} />
                    </div>
                </div>
                <button
                    className="btn btn-sm px-5 bg-slate-900"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserSidebar;
