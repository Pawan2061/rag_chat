import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/v1", router);

const PORT = process.env.PORT ? process.env.PORT : 3000;
app.listen(PORT, () => {
  console.log(`workign on port ${PORT}`);
});
