// import "dotenv/config";
// import { promises as fs } from "fs";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { CSVLoader } from "langchain/document_loaders/fs/csv";
// import { NotionAPILoader } from "langchain/document_loaders/web/notionapi";
// import { NotionAPI } from "notion-client";

// const api = new NotionAPI();

// import { createClient } from "@supabase/supabase-js";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
// const sbApiKey: string = process.env.SUPABASE_key || "";
// const sbUrl: string = process.env.SUPABASE_URL || "";

// const client = createClient(sbUrl, sbApiKey);
// async function loadData() {
//   try {
//     console.log("ere");

//     const page = await api.getPage("c66d5236e8ea40df8af114f6d447ab48");

//     // const pageText = Object.values(page.block)
//     //   .map((block: any) => block.value?.properties?.title?.[0]?.[0] || "")
//     //   .join("\n");

//     // console.log(pageText, "here");

//     const openAIApiKey =
//       "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";
//     const splitter = new RecursiveCharacterTextSplitter({
//       chunkSize: 2000,
//       chunkOverlap: 100,
//     });
//     // const docs = [
//     //   {
//     //     pageContent: pageText,
//     //     metadata: {},
//     //   },
//     // ];

//     const docChunks = await splitter.createDocuments([JSON.stringify(page)]);

//     const docs = await splitter.splitDocuments(docChunks);

//     const store = await SupabaseVectorStore.fromDocuments(
//       docs,
//       new OpenAIEmbeddings({ openAIApiKey }),

//       {
//         client,
//         queryName: "match_documents",
//         tableName: "documents",
//       }
//     );
//   } catch (error) {
//     return error;
//   }
// }

// export { loadData };

import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NotionAPI } from "notion-client";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

const api = new NotionAPI();

async function loadData() {
  try {
    const sbApiKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tbWhidmdxbHRhdW5hYW54dm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5OTEzMjksImV4cCI6MjA1MTU2NzMyOX0.d9GfIDOsgS7SD1asc_064HnbFiYqFVt7B-WsMB8KWP0";
    const sbUrl = "https://mmmhbvgqltaunaanxvod.supabase.co";

    if (!sbApiKey || !sbUrl) {
      throw new Error("Missing Supabase credentials");
    }

    const client = createClient(sbUrl, sbApiKey);

    const openAIApiKey = process.env.OPENAI_API_KEY;

    const page = await api.getPage("c66d5236e8ea40df8af114f6d447ab48");

    const pageContent = JSON.stringify(page, null, 2);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await splitter.createDocuments(
      [pageContent],
      [{ source: "notion", pageId: "c66d5236e8ea40df8af114f6d447ab48" }]
    );

    const store = await SupabaseVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey }),
      {
        client,
        tableName: "documents",
        queryName: "match_documents_v2",
      }
    );

    return store;
  } catch (error) {
    console.error("Error loading documents:", error);
    throw error;
  }
}

export { loadData };
