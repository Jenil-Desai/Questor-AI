import { GoogleAIFileManager } from "@google/generative-ai/server";

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

export default async function fileUploader(title, path) {
  const uploadResponse = await fileManager.uploadFile(path, {
    mimeType: "application/pdf",
    displayName: title,
  });

  console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
  return uploadResponse;
}
