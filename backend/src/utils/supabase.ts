import "dotenv/config";
import { promises as fs } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { NotionAPILoader } from "langchain/document_loaders/web/notionapi";
import { NotionAPI } from "notion-client";

// you can optionally pass an authToken to access private notion resources
const api = new NotionAPI();

import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
const sbApiKey: string = process.env.SUPABASE_key || "";
const sbUrl: string = process.env.SUPABASE_URL || "";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";

const client = createClient(sbUrl, sbApiKey);
async function loadData() {
  try {
    console.log("ere");

    const page = await api.getPage("c66d5236e8ea40df8af114f6d447ab48");
    const pageText = Object.values(page.block)
      .map((block: any) => block.value?.properties?.title?.[0]?.[0] || "")
      .join("\n");

    const openAIApiKey =
      "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";
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docChunks = await splitter.createDocuments([pageText]);

    const docs = await splitter.splitDocuments(docChunks);
    await SupabaseVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey }),
      {
        client,
        tableName: "langchain",
      }
    );
    console.log("succes");
  } catch (error) {
    return error;
  }
}

export { loadData };
