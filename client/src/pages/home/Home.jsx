import React, { useEffect } from "react";
import MessageContainer from "./MessageContainer";
import UserSidebar from "./UserSidebar";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket,  setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/message.slice";

const Home = () => {

    const { isAuthenticated, userProfile } = useSelector((state) => state.user);
    const dispatch = useDispatch()
     const { socket, onlineUsers } = useSelector(
         (state) => state.socket
     );

    useEffect(() => {
        if (!isAuthenticated) return
        dispatch(initializeSocket(userProfile?._id));
   }, [isAuthenticated])

   useEffect(() => {
       if (!socket) return;

        socket.on("connect", () => {
            console.log("Socket connected", socket.id);
        });

       socket.on("onlineUsers", (onlineUsers) => {
           dispatch(setOnlineUsers(onlineUsers));
       });
       socket.on("newMessage", (newMessage) => {
           dispatch(setNewMessage(newMessage));
       });
       return () => {
           socket.off("connect");
           socket.off("onlineUsers");
           socket.off("newMessage");
       };
   }, [socket]);
   
    
    return (
        <div className="flex">
            <UserSidebar/>
            <MessageContainer/>
        </div>
    );
};

export default Home;
