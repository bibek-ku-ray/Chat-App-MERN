import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
    const { fullName, username, email, password, gender } = req.body;

    if (!fullName || !username || !email || !password || !gender) {
        return next(new errorHandler("All field required!", 400));
    }

    //check user exist or not
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
        return next(new errorHandler("Username or email already in use.", 409));
    }

    // hash password
    const SALT = process.env.BCRYPT_SALT;
    const hashedPassword = bcrypt.hashSync(password, parseInt(SALT));

    //creating avatar based on gender and username
    const avatarType = gender === "male" ? "boy" : "girl";
    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

    // creating new user
    const newUser = await User.create({
        fullName,
        username,
        email,
        password: hashedPassword,
        gender,
        avatar,
    });

    // generate cookie
    const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });

    return res
        .status(201)
        .cookie("token", jwtToken, {
            expires: new Date(
                Date.now() +
                    Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        })
        .json({
            success: true,
            message: "User created",
            data: newUser,
            token: jwtToken,
        });
});

export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    console.log({ username, password });

    if (!username || !password) {
        return next(new errorHandler("All field required!", 400));
    }

    // check user exits or not, if not -> return
    const user = await User.findOne({ username });
    if (!user) {
        return next(new errorHandler("Enter valid username or password!", 404));
    }

    // check username and password, if false -> return
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return next(new errorHandler("Enter valid username or password!", 404));
    }

    // Generate JWT token and store in cookie
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });

    // return
    return res
        .status(200)
        .cookie("token", jwtToken, {
            expires: new Date(
                Date.now() +
                    Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
        })
        .json({
            success: true,
            message: "User LoggedIn",
            data: user,
            token: jwtToken,
        });
});

export const logout = asyncHandler(async (req, res, next) => {
    return res
        .status(200)
        .cookie("token", "", { expires: new Date(Date.now()), httpOnly: true })
        .json({
            success: true,
            message: "Logout successful",
            data: "",
        });
});

export const getProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);

    return res.status(200).json({
        success: true,
        message: "",
        data: user,
    });
});

export const getAllOtherUsers = asyncHandler(async (req, res, next) => {
    // get all user excluding me 
    const otherUsers = await User.find({ _id: { $ne: req.user.id } });

    return res.status(200).json({
        success: true,
        message: "All other users fetched successfully",
        data: otherUsers,
    });
});
