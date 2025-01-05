import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";
// import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import cors from "cors";
import { model } from "./utils/model";
// import { NotionAPI } from "notion-client";
import { loadData } from "./utils/supabase";
dotenv.config();

const app = express();
// const c = new Client();

app.use(cors());
const api = new NotionAPI();

app.use(express.json());
app.use("/api/v1", router);

const PORT = process.env.PORT ? process.env.PORT : 3000;
async function main() {
  try {
    const docs = await loadData();
    console.log(docs);
  } catch (error) {
    console.error("Error:", error);
  }
}

// main();

app.listen(PORT, () => {
  console.log(`workign on port ${PORT}`);
});
