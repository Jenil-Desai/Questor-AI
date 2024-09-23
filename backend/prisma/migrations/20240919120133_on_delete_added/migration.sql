-- DropForeignKey
ALTER TABLE "QuestionPaper" DROP CONSTRAINT "QuestionPaper_documentId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionPaper" DROP CONSTRAINT "QuestionPaper_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionType" DROP CONSTRAINT "QuestionType_questionPaperId_fkey";

-- AddForeignKey
ALTER TABLE "QuestionPaper" ADD CONSTRAINT "QuestionPaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionPaper" ADD CONSTRAINT "QuestionPaper_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "DocumentMetadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionType" ADD CONSTRAINT "QuestionType_questionPaperId_fkey" FOREIGN KEY ("questionPaperId") REFERENCES "QuestionPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
