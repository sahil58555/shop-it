import express from "express";
const app=express();
import dotenv from 'dotenv';
import productRouter from './routes/products.js';
import userRouter from './routes/user.js';
import orderRouter from './routes/order.js';
import {connectDatabase} from './config/dbConnect.js';
import errorMiddleware from "./Middleware/ErrorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err}`);
    process.exit(1);
});

dotenv.config({path:"backend/config.env"});


connectDatabase();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1",productRouter);
app.use("/api/v1",userRouter);
app.use('/api/v1',orderRouter);

app.use(errorMiddleware);

const server=app.listen(process.env.PORT, ()=>{
    console.log(`Server started on Port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err}`);
    
    server.close(()=>{
        process.exit(1);
    });
});
