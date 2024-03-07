import catchAsyncErrors from "./CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Checks if user is authenticated or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401,"Login first to access this resource"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

export const authorize = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(400,`User (${req.user.role}) do not have access for this request`));
    }
    next();
  }
}
