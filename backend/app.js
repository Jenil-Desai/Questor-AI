import express from "express";
import cors from "cors";
import "dotenv/config";

import userRoutes from "./routes/userRouter.js";
import ExpressError from "./utils/ExpressError.js";
import questionPaperRoutes from "./routes/questionPaperRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/question-paper", questionPaperRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "EndPoint Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server Listening On Port ${PORT}`);
});
