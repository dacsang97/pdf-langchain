import dotenv from "dotenv-safe";
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

dotenv.config();

const loader = new PDFLoader("./cv.pdf");
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
