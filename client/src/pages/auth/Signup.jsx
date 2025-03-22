import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    console.log(signupData)

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="">
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                    <legend className="fieldset-legend text-2xl">Signup</legend>
                    <label className="fieldset-label">Full Name</label>
                    <input
                        name="fullName"
                        onChange={handleInputChange}
                        type="text"
                        className="input"
                        placeholder="Full Name"
                    />
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
                    <label className="fieldset-label">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        onChange={handleInputChange}
                        type="password"
                        className="input"
                        placeholder="Confirm Password"
                    />
                    <button className="btn btn-neutral mt-3">Signup</button>
                    <span className="flex gap-1 mt-2">
                        <p className="">Already have an account? </p>{" "}
                        <Link
                            to="/login"
                            className="link link-success font-semibold"
                        >
                            Login
                        </Link>
                    </span>
                </fieldset>
            </div>
        </div>
    );
};

export default Signup;
