import "dotenv/config";
import { promises as fs } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
const sbApiKey: string = process.env.SUPABASE_key || "";
const sbUrl: string = process.env.SUPABASE_URL || "";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const client = createClient(sbUrl, sbApiKey);
(async () => {
  const loader = new PDFLoader("./your_file_path");

  const docs = await loader.load();

  const openAIApiKey = process.env.OPENAI_API_KEY;

  // const output = await splitter.createDocuments([docs]);
  await SupabaseVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey }),
    {
      client,
      tableName: "documents",
    }
  );
  console.log("succes");
})();
