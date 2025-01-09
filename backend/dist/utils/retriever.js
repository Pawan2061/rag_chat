import "dotenv/config";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
const openAIApiKey = "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";
console.log(process.env.SUPABASE_URL);
const embeddings = new OpenAIEmbeddings({ openAIApiKey });
const sbApiKey = process.env.SUPABASE_key || "";
const sbUrl = process.env.SUPABASE_URL || "";
const client = createClient(sbUrl, sbApiKey);
const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents1",
    queryName: "match_documents_v3",
});
const retriever = vectorStore.asRetriever({
    callbacks: [
        {
            handleRetrieverEnd: (documents) => {
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
