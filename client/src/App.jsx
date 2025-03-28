import "./App.css";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    getAllUsersThunk,
    getUserProfileThunk,
} from "./store/slice/user/user.thunk";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getUserProfileThunk());
            await dispatch(getAllUsersThunk());
        })();
    }, []);

    return (
        <>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
}

export default App;
