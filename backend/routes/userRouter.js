import express from "express";

import { userDestroy, userDetails, userSignin, userSignup } from "../controllers/userController.js";
import { validateUserSignupBody, validateUserSignInBody } from "../middlewares/userMiddleware.js";
import verifyToken from "../middlewares/verifyToken.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post("/signup", validateUserSignupBody, wrapAsync(userSignup));

router.post("/signin", validateUserSignInBody, wrapAsync(userSignin));

router.get("/", verifyToken, wrapAsync(userDetails));

router.delete("/", verifyToken, wrapAsync(userDestroy));

export default router;
