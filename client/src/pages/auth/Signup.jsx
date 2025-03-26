import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
    const [signupData, setSignupData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const [error, setError] = useState({
        password: false,
    })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (signupData.password !== signupData.confirmPassword) {
            setError((prev) => ({
                ...prev,
                password: true,
            }));
        } else {
            setError((prev) => ({
                ...prev,
                password: false,
            }));
        }
    }, [signupData.password, signupData.confirmPassword]);

    const dispatch = useDispatch();

    const handleSingUp = async () => {
        if (error.password) {
            return toast.error("Passwords don't match", {
                style: {
                    color: "#fff",
                    background: "#09090b",
                },
            });
        } 
        const response = await dispatch(registerUserThunk(signupData));
        
        if(response?.payload?.success) {
            navigate("/");
        }
    };

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
                    <label className="fieldset-label">Username</label>
                    <input
                        name="username"
                        onChange={handleInputChange}
                        type="text"
                        className="input"
                        placeholder="Username"
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
                    <label className="fieldset-label">Gender</label>
                    <select
                        defaultValue=""
                        className="select"
                        name="gender"
                        onChange={handleInputChange}
                    >
                        <option value="" disabled={true}>
                            Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <button
                        className="btn btn-neutral mt-3"
                        onClick={handleSingUp}
                    >
                        Signup
                    </button>

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
