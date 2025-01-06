import express from "express";
import { askQuestion } from "../controller";
import { loadData } from "../utils/supabase";
export const router = express.Router();
router.post("/loadnotion/:id", loadData);
router.post("/ask", askQuestion);
