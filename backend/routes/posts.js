import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {create,updated,deletePost,getPost,searchPost,getUserPost} from '../controllers/postController.js'
const router = express.Router();

// CREATE
router.post("/create", verifyToken,create);

// UPDATE
router.put("/:id", verifyToken,updated);

// DELETE
router.delete("/:id", verifyToken,deletePost);

// GET POST DETAILS
router.get("/:id",getPost);

// GET POSTS
router.get("/", searchPost);

// GET USER POSTS
router.get("/user/:userId",getUserPost);

export default router;
