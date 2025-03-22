import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        console.log(loginData);
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="">
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                    <legend className="fieldset-legend text-2xl">Login</legend>
                    <label className="fieldset-label">Email</label>
                    <input
                        name="email"
                        onChange={handleInputChange}
                        type="email"
                        className="input"
                        placeholder="Email"
                    />
                    <label className="fieldset-label">Password</label>
                    <input
                        name="password"
                        onChange={handleInputChange}
                        type="password"
                        className="input"
                        placeholder="Password"
                    />
                    <button className="btn btn-neutral mt-3">Login</button>
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
