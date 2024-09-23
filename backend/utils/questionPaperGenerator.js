import { GoogleGenerativeAI } from "@google/generative-ai";

import safetySettings from "../utils/systemSettings.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function questionPaperGenerator(docsMetadata, prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings,
  });

  const result = await model.generateContent([
    {
      fileData: {
        mimeType: docsMetadata.mimeType,
        fileUri: docsMetadata.url,
      },
    },
    prompt,
  ]);

  // const response = await result.response.text();

  const responseText = await result.response.text();
  const response = await JSON.parse(responseText);
  return response;
}
