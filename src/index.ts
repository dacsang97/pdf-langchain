import dotenv from "dotenv-safe";
import path from "path";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

dotenv.config();

const PDF_PATH = path.resolve("./cv.pdf");

const loader = new PDFLoader(PDF_PATH);
const docs = await loader.load();

const question = `
1. What is your name?
2. What is your major?
3. What are the projects you have participated in, the role in each project? Format:
  - Project - Role
`;
const llmA = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const chainA = loadQAStuffChain(llmA);

const resA = await chainA.call({
  input_documents: docs,
  question: question,
});
console.log({ resA });
