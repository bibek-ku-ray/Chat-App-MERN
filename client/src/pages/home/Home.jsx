import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slice/user/user.slice";
import { loginUserThunk } from "../../store/slice/user/user.thunk";
import MessageContainer from "./MessageContainer";
import UserSidebar from "./UserSidebar";

const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.user);
    console.log(selector);

    return (
        <div className="flex">
            <UserSidebar/>
            <MessageContainer/>
        </div>
    );
};

export default Home;
