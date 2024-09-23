import express from "express";
import multer from "multer";

import { answerPaperDownload, questionPaperCreate, questionPaperDestroy, questionPaperDetails, questionPaperDownload } from "../controllers/questionPaperController.js";
import verifyToken from "../middlewares/verifyToken.js";
import { storage } from "../configs/multer.js";
import wrapAsync from "../utils/wrapAsync.js";

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", verifyToken, upload.single("document"), wrapAsync(questionPaperCreate));

router.get("/:id", verifyToken, wrapAsync(questionPaperDetails));

router.delete("/:id", verifyToken, wrapAsync(questionPaperDestroy));

router.get("/download-qp/:id", verifyToken, wrapAsync(questionPaperDownload));

router.get("/download-ap/:id", verifyToken, wrapAsync(answerPaperDownload));

export default router;
