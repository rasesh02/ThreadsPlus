import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getUserProfile, getSuggestedUser,updateUser} from "../controllers/user.controller.js"; 


const router=express.Router();

router.get("/profile/:username",protectRoute,getUserProfile);
router.get("/suggested",protectRoute,getSuggestedUser);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.post("/updateUser",protectRoute,updateUser);

export default router;