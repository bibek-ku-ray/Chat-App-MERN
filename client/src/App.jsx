import "./App.css"
import { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfileThunk } from "./store/slice/user/user.thunk";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProfileThunk())
  }, [])

  return (
      <>
          <Toaster position="top-center" reverseOrder={true} />
      </>
  );
}

export default App
