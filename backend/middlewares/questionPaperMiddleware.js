import { questionPaperCreateBodySchema } from "../validations/questionPaper.js";

export const validateQuestionPaperCreateBody = (req, res, next) => {
  const body = req.body;

  const result = questionPaperCreateBodySchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({ error: `${result.error.issues[0].path[0]} ${result.error.issues[0].message}` });
  }
  next();
};
