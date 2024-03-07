import catchAsyncError from "../Middleware/CatchAsyncError.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';

export const signUp= catchAsyncError(async (req, res,next) => {
    const {name,email,password}=req.body;
    const user= await User.create({
        name,
        email,
        password,
    });
    sendToken(user,201,res);
});

export const login = catchAsyncError(async (req,res,next)=>{
    const {email, password}=req.body;
    if(!email || !password) return next(new ErrorHandler(400,"Please enter email & Password"));
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler(401,"Invalid email or Password"));
    }

    const isValidPassword = await user.comparePassword(password);

    if(!isValidPassword){
        return next(new ErrorHandler(401,"Please enter valid email or password"));
    }

    sendToken(user,200,res);
})

export const logout= catchAsyncError(async (req, res,next) => {
    res.cookie("token",null,{
        expires: new Date(Date.now() ),
        httpOnly:true,
    });
    res.status(200).json({
        message: "Logged out",
    });
});

export const resetPasswordMailer = catchAsyncError(async (req,res,next)=>{
    const {email} = req.body;

    if(!email)  return next(new ErrorHandler(400,"Please enter email"));

    const user = await User.findOne({email});

    if(!user)  return next(new ErrorHandler(400,"Please enter valid email"));
    
    const token=await user.getResetPasswordToken();
    console.log(token);
    await user.save();

    const options = {
        email: user.email,
        subject: "Reset Password",
        message: getResetPasswordTemplate(user?.name,token),
    }
    try{
        // await sendEmail(options);
        res.status(200).json({
            message:"Password reset link sent to mail",
        })
    }
    catch(error){
        user.resetPasswordToken=undefined,
        user.resetPasswordExpire=undefined,
        await user.save();

        return next(new ErrorHandler(400,error.message)); 
    }
});

export const resetPassword= catchAsyncError(async (req,res,next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt:Date.now()}
    });

    if(!user)   return next(new ErrorHandler(400,"Password reset token is wrong or been expired."));

    if(req.body.password!=req.body.confirmPassword)  return next(new ErrorHandler(400,"Password does not match"));

    try{
        user.password=req.body.password,
        user.resetPasswordToken=undefined,
        user.resetPasswordExpire=undefined,
        // console.log(user);
        await user.save();
        sendToken(user,200,res);
    }
    catch(error){
       return next(new ErrorHandler(400,error.message));
    }
});

export const getUserProfile = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user._id);

    res.status(200).json({
        user,
    });
});

export const updatePassword = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.currentPassword);
    if(!isPasswordMatch)   next(new ErrorHandler(400,"Please enter correct password"));

    if(req.body.password===req.body.currentPassword){
        return next(new ErrorHandler(400,"Password should not match last password"));
    }

    user.password=req.body.password;
    await user.save();

    // res.status(200).json({
    //     messaga:"Password updated sucessfully",
    // });
    await sendToken(user,200,res);

});

export const updateUserProfile = catchAsyncError(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData,{
        new:true,
    });
    res.status(200).json({
        message: "User details updated sucessfully",
    });
});

export const getUsers = catchAsyncError(async (req,res,next)=>{
    const users= await User.find();

    res.status(200).json({
        users
    });
});

export const getUserDetails = catchAsyncError(async (req,res,next)=>{
    const user= await User.findById(req.params.id);

    res.status(200).json({
        user
    });
});

