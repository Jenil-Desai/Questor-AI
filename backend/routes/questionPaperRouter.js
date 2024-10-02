import express from "express";
import multer from "multer";

import { answerPaperDownload, questionPaperCreate, questionPaperDestroy, questionPaperDetails, questionPaperDownload } from "../controllers/questionPaperController.js";
import  { authMiddleware } from "../middlewares/verifyToken.js";
import { storage } from "../configs/multer.js";
import wrapAsync from "../utils/wrapAsync.js";

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", authMiddleware, upload.single("document"), wrapAsync(questionPaperCreate));

router.get("/:id", authMiddleware, wrapAsync(questionPaperDetails));

router.delete("/:id", authMiddleware, wrapAsync(questionPaperDestroy));

router.get("/download-qp/:id", authMiddleware, wrapAsync(questionPaperDownload));

router.get("/download-ap/:id", authMiddleware, wrapAsync(answerPaperDownload));

export default router;
