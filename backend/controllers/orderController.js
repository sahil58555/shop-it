import catchAsyncError from "../Middleware/CatchAsyncError.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createOrder = catchAsyncError(async (req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        orderStatus,
    }=req.body;

    await Order.create({
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        orderStatus,
        user:req.user._id
    });

    res.status(200).json({
        message: "Order created sucessfully",
    });

});

export const getOrderDetails = catchAsyncError(async (req,res,next)=>{
    const order =await Order.findById(req.params.id).populate("user", "name email");

    if(!order){
        return next(new ErrorHandler(400,"Please enter valid order id"));
    }
    res.status(200).json({
        order
    });
});

export const getOrders = catchAsyncError(async (req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    if(!orders){
        return next(new ErrorHandler(400,"No order found"));
    }

    res.status(200).json({
        orders,
    });

})

export const getAllOrders = catchAsyncError(async (req,res,next)=>{
    const orders = await Order.find().populate("user");
    if(!orders)  return next(new ErrorHandler(400,"No order found"));

    res.status(200).json({
        orders
    });
})
