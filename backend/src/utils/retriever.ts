import "dotenv/config";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import { combineDocs } from "./combine";

const openAIApiKey = process.env.OPENAI_API_KEY;

const embeddings = new OpenAIEmbeddings({ openAIApiKey });
const sbApiKey: string = process.env.SUPABASE_key || "";
const sbUrl: string = process.env.SUPABASE_URL || "";
const client = createClient(sbUrl, sbApiKey);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents_v2",
});

const retriever = vectorStore.asRetriever({
  callbacks: [
    {
      handleRetrieverEnd: (documents: any[]) => {
        console.log(documents, "here theua re");

        return documents.map((doc) => ({
          pageContent: doc.content,
          metadata: doc.metadata,
        }));
      },
    },
  ],
});

export { retriever };
