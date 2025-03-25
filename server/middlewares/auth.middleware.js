import { asyncHandler } from "../utils/asyncHandler.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    // getting token(jwt) from cookie or header
    const token =
        req.cookies.token ||
        req.headers["authorization"]?.replace("Bearer ", "").trim();

    if (!token) {
        return next(new errorHandler("Invalid token", 401));
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    // setting user data (tokenData) in request
    req.user = tokenData;
    next();
});
