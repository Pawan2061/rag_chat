import "dotenv/config";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

const openAIApiKey = process.env.OPENAI_API_KEY;
console.log(process.env.SUPABASE_URL);

const embeddings = new OpenAIEmbeddings({ openAIApiKey });
const sbApiKey: string = process.env.SUPABASE_key || "";
const sbUrl: string = process.env.SUPABASE_URL || "";

const client = createClient(sbUrl, sbApiKey);

const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});

const retriever = vectorStore.asRetriever();

export { retriever };
