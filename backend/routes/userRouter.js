import express from "express";

import { userDestroy, userDetails, userSignin, userSignup } from "../controllers/userController.js";
import { validateUserSignupBody, validateUserSignInBody } from "../middlewares/userMiddleware.js";
import wrapAsync from "../utils/wrapAsync.js";
import { authMiddleware } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup",  wrapAsync(userSignup));

router.post("/signin",  wrapAsync(userSignin));

router.get("/", authMiddleware, wrapAsync(userDetails));

router.delete("/", authMiddleware, wrapAsync(userDestroy));

export default router;
