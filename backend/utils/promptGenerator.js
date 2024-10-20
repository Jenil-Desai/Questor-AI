export default function promptGenerator(questionType, difficulty) {
  let prompt = `Based on the uploaded PDF material, generate a question paper with the overall difficulty level set to [${difficulty}]. The paper should include the following types of questions:

    Multiple Choice Questions (MCQs): Generate [${questionType.MCQ.numberOfQuestions}] questions, each carrying [${questionType.MCQ.marksPerQuestion}] marks. Provide 4 options for each question and the correct answer.
    Fill in the Blanks: Generate [${questionType.FIB.numberOfQuestions}] questions, each carrying [${questionType.FIB.marksPerQuestion}] marks.
    Short Answer Questions: Generate [${questionType.SAQ.numberOfQuestions}] questions, each carrying [${questionType.SAQ.marksPerQuestion}] marks. Answers should be concise.
    Long Answer Questions: Generate [${questionType.LAQ.numberOfQuestions}] questions, each carrying [${questionType.LAQ.marksPerQuestion}] marks. Answers should be detailed and comprehensive.

    The overall difficulty of the paper should be [${difficulty}], and the questions should reflect this difficulty level accordingly. Please structure the response in the following JSON format:
    {
      "difficulty": "[${difficulty}]",
      "totalMarks": "[T]",
      "questions": [
        {
          "type": "MCQ",
          "marks": "[Y]",
          "question": "Question 1?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Correct Answer"
        },
        {
          "type": "Fill in the Blanks",
          "marks": "[Y]",
          "question": "This is a ______?",
          "answer": "Correct Answer"
        },
        {
          "type": "Short Answer",
          "marks": "[Y]",
          "question": "Explain briefly about ______.",
          "answer": "Expected Answer"
        },
        {
          "type": "Long Answer",
          "marks": "[Y]",
          "question": "Discuss in detail about ______.",
          "answer": "Expected Answer"
        }
      ]
    }
      
    Replace placeholders with actual questions and answers based on the material. The total marks for the paper should be [T].
    Don't Use Any backticks and formatters just return normal JSON Object.
    `;

  return prompt;
}
