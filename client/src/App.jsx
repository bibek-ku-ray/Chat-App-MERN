import "./App.css";
import { Toaster } from "react-hot-toast";
import {
    getAllUsersThunk,
    getUserProfileThunk,
} from "./store/slice/user/user.thunk";
import { useDispatch } from "react-redux";

function App() {
    const dispatch = useDispatch();

    dispatch(getUserProfileThunk());
    dispatch(getAllUsersThunk());

    return (
        <>
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
}

export default App;
