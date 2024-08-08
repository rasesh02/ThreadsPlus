import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { commentOnPost, createPost, deletePost,  getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/post.controller.js";
const router= express.Router();

router.post("/createPost",protectRoute,createPost);
router.post("/delete/:id",protectRoute,deletePost);
router.post("/comment/:id",protectRoute,commentOnPost);
router.post("/likeUnlike/:id",protectRoute,likeUnlikePost);
router.get("/all",protectRoute,getAllPosts);
router.get("/likedPosts/:id",protectRoute,getLikedPosts);
router.get("/following",protectRoute,getFollowingPosts);
router.get("/myPosts/:username",protectRoute,getUserPosts);
export default router;