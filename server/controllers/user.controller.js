import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import bcrypt from "bcrypt"

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
    const hashedPassword = bcrypt.hashSync(password, parseInt(SALT))

    //creating avatar based on gender and username
    const avatarType = gender === "male" ? "boy" : "girl"
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

    return res.json({
        success: true,
        status: 201,
        message: "User created",
        data: newUser
    })
});

export const login = asyncHandler(async (req, res, next) => {

    const {username, password} = req.body

    console.log({ username, password });

    if (!username || !password) {
        return next(new errorHandler("All field required!", 400));
    }

    // check user exits or not, if not -> return
    const user = await User.findOne({username})
    if (!user) {
        return next(new errorHandler("Enter valid username or password!", 404))
    }

    // check username and password, if false -> return
    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if(!isPasswordValid) {
        return next(new errorHandler("Enter valid username or password!", 404));
    }

    // Generate JWT token and store in cookie

    // return
    return res.json({
        success: true,
        status: 200,
        message: "User LoggedIn",
        data: user,
    });
    
})