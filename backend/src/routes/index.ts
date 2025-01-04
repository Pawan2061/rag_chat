import express from "express";
import { askQuestion } from "../controller";
export const router = express.Router();
router.post("/ask", askQuestion);
