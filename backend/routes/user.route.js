import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getUserProfile } from "../controllers/user.controller.js"; 


const router=express.Router();

router.get("/profile/:username",protectRoute,getUserProfile);
//router.get("/suggested",protectRoute,);
router.post("/follow/:id",protectRoute,followUnfollowUser);
//router.get("/update",protectRoute,);

export default router;