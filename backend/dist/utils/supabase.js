import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { NotionAPI } from "notion-client";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
const api = new NotionAPI();
async function loadData() {
    try {
        const sbApiKey = process.env.SUPABASE_key;
        console.log(process.env.SUPABASE_URL);
        const sbUrl = process.env.SUPABASE_URL;
        console.log(process.env.SUPABASE_key);
        if (!sbApiKey || !sbUrl) {
            throw new Error("Missing Supabase credentials");
        }
        const client = createClient(sbUrl, sbApiKey);
        const openAIApiKey = process.env.OPENAI_API_KEY;
        console.log(process.env.OPENAI_API_KEY);
        const pageId = process.env.PAGE_ID;
        console.log(process.env.PAGE_ID);
        const page = await api.getPage(pageId);
        const pageContent = JSON.stringify(page, null, 2);
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 500,
            chunkOverlap: 100,
            separators: ["\n\n", "\n", ".", "!", "?", " ", ""],
        });
        const docs = await splitter.createDocuments([pageContent], [{ source: "notion", pageId: pageId }]);
        const store = await SupabaseVectorStore.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey }), {
            client,
            tableName: "documents1",
            queryName: "match_documents_v3",
        });
        return store;
    }
    catch (error) {
        console.error("Error loading documents:", error);
        throw error;
    }
}
export { loadData };
