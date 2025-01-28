import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";
import { NotionAPI } from "notion-client";
import cors from "cors";
import { model } from "./utils/model";
import { loadData } from "./utils/supabase";
import { NotionAPILoader } from "langchain/document_loaders/web/notionapi";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
dotenv.config();

const app = express();

app.use(cors());
const api = new NotionAPI();

app.use(express.json());
app.use("/api/v1", router);
const PORT = process.env.PORT ? process.env.PORT : 3000;
async function main() {
  try {
    const docs = await loadData();
  } catch (error) {
    console.error("Error:", error);
  }
}

// main();

app.listen(PORT, () => {
  console.log(`workign on port ${PORT}`);
});

// "npx tsx src/index.ts"
