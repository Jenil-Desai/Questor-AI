import { PrismaClient } from "@prisma/client";

import questionPaperGenerator from "../utils/questionPaperGenerator.js";
import createQuestionPDF from "../utils/CreateQuestionPDF.js";
import createAnswerPDF from "../utils/CreateAnswerPDF.js";
import promptGenerator from "../utils/promptGenerator.js";
import fileUploader from "../utils/fileUploader.js";

const prisma = new PrismaClient();

export const questionPaperCreate = async (req, res) => {
  const body = req.body;
  const userId = res.locals.user.id;
  const requestBody = JSON.parse(body.data);
  const { title, difficulty, questionType } = requestBody;
  console.log(requestBody);

  const docsResponse = await fileUploader(title, req.file.path);

  const docsMetadata = await prisma.documentMetadata.create({
    data: {
      name: docsResponse.file.displayName,
      mimeType: docsResponse.file.mimeType,
      url: docsResponse.file.uri,
    },
  });

  const prompt = promptGenerator(questionType, difficulty);

  const generatedQuestionPaper = await questionPaperGenerator(docsMetadata, prompt);
  console.log(typeof generatedQuestionPaper);
  const questionPaper = await prisma.questionPaper.create({
    data: {
      title,
      totalMarks: parseInt(generatedQuestionPaper.totalMarks),
      difficulty,
      questions: generatedQuestionPaper.questions,
      userId: userId,
      documentId: docsMetadata.id,
    },
  });

  Object.keys(questionType).forEach(async (type) => {
    const { numberOfQuestions, marksPerQuestion } = questionType[type];
    await prisma.questionType.create({
      data: {
        type: type,
        marksPerQuestion: Number.parseInt(marksPerQuestion),
        numberOfQuestions: Number.parseInt(numberOfQuestions),
        questionPaperId: questionPaper.id,
      },
    });
  });

  res.json(questionPaper);
};

export const questionPaperDownload = async (req, res) => {
  const { id } = req.params;

  const questionPaper = await prisma.questionPaper.findUnique({
    where: { id },
    include: {
      questionTypes: {
        orderBy: {
          type: "asc",
        },
      },
    },
  });

  if (!questionPaper) {
    return res.staus(403).json({ error: "Question Paper Does Not Exists" });
  }

  try {
    const filePath = await createQuestionPDF(questionPaper);
    return res.download(filePath);
  } catch (err) {
    console.error("Error creating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

export const answerPaperDownload = async (req, res) => {
  const { id } = req.params;

  const questionPaper = await prisma.questionPaper.findUnique({
    where: { id },
    include: {
      questionTypes: {
        orderBy: {
          type: "asc",
        },
      },
    },
  });

  if (!questionPaper) {
    return res.staus(403).json({ error: "Question Paper Does Not Exists" });
  }
  console.log(questionPaper);
  try {
    const filePath = await createAnswerPDF(questionPaper);
    return res.download(filePath);
  } catch (err) {
    console.error("Error creating PDF:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};

export const questionPaperDetails = async (req, res) => {
  const { id } = req.params;

  const questionPaper = await prisma.questionPaper.findUnique({
    where: {
      id,
    },
    include: {
      questionTypes: {
        orderBy: {
          type: "asc",
        },
      },
    },
  });

  if (!questionPaper) {
    return res.staus(403).json({ error: "Question Paper Does Not Exists" });
  }

  res.status(200).json(questionPaper);
};

export const questionPaperHistroy = async (req, res) => {
  const userId = res.locals.user.id;

  const questionPapers = await prisma.questionPaper.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      totalMarks: true,
      difficulty: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  res.status(200).json(questionPapers);
};

export const questionPaperDestroy = async (req, res) => {
  const { id } = req.params;

  const questionPaper = await prisma.questionPaper.delete({
    where: {
      id,
    },
    include: {
      questionTypes: {
        orderBy: {
          type: "asc",
        },
      },
    },
  });

  if (!questionPaper) {
    return res.staus(403).json({ error: "Question Paper Does Not Exists" });
  }

  res.status(200).json(questionPaper);
};
