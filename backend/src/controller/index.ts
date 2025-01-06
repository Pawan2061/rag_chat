import { chain } from "../utils/chain";
import { Request, Response } from "express";
import { loadData } from "../utils/supabase";

const loadNotion = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "notionid not found",
      });
    }
    const response = await loadData();
    if (!response) {
      return res.status(400).json({
        message: "error loading the data",
      });
    }
    return res.status(200).json({
      message: "loaded successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
};
const askQuestion = async (req: Request, res: Response): Promise<any> => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({
        message: "Question is Required",
      });
    }

    const response = await chain.invoke({
      question,
    });
    console.log(response.length);
    console.log(response[0]);

    return res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error,
    });
  }
};

export { askQuestion };
