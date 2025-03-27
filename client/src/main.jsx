import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

import Home from "./pages/home/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute>,
    },
    {
        path: "/login",
        element: <ProtectedRoute><Login /></ProtectedRoute>,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);

createRoot(document.getElementById("root")).render(
    <>
        <Provider store={store}>
            <App />
            <RouterProvider router={router} />
        </Provider>
    </>
);
