import express from 'express';
import {register,login,logout,refetch} from '../controllers/authController.js'

const router = express.Router();

// REGISTER
router.post("/register",register);

// LOGIN
router.post("/login", login);

// LOGOUT
router.get("/logout",logout);

// REFETCH USER
router.get("/refetch", refetch);

export default router;
