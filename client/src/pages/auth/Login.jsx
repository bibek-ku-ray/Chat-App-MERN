import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk, getUserProfileThunk, loginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const { isAuthenticated } = useSelector((state) => state.user);

    const handleInputChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await dispatch(loginUserThunk(loginData));
        if (response?.payload?.success) {
            await dispatch(getUserProfileThunk());
            await dispatch(getAllUsersThunk());
            navigate("/");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="">
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                    <legend className="fieldset-legend text-2xl">Login</legend>
                    <label className="fieldset-label">Username</label>
                    <input
                        name="username"
                        onChange={handleInputChange}
                        type="text"
                        className="input"
                        placeholder="Username"
                    />
                    <label className="fieldset-label">Password</label>
                    <input
                        name="password"
                        onChange={handleInputChange}
                        type="password"
                        className="input"
                        placeholder="Password"
                    />
                    <button
                        className="btn btn-neutral mt-3"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <span className="flex gap-1 mt-2">
                        <p className="">Don't have an account? </p>{" "}
                        <Link
                            to="/signup"
                            className="link link-success font-semibold"
                        >
                            Signup
                        </Link>
                    </span>
                </fieldset>
            </div>
        </div>
    );
};

export default Login;
