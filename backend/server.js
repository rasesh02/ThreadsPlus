import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

dotenv.config({
    path:"./.env"
});
const app=express();
const port =process.env.PORT || 5000;
app.use(express.json({limit: "5mb"})); //middleware to parse req.body
app.use(express.urlencoded({extended:true})); //to parse form data(urlencoded) eg:in postman we pass form data
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/users",userRoutes);

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
    connectDB();
})