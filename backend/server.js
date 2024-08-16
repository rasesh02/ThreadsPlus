import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from "cloudinary";

dotenv.config({
    path:"./.env"
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app=express();
const port =process.env.PORT || 5000;
const __dirname=path.resolve();

app.use(express.json({limit: "5mb"})); //middleware to parse req.body
app.use(express.urlencoded({extended:true})); //to parse form data(urlencoded) eg:in postman we pass form data
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/notification",notificationRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
    connectDB();
})