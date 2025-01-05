import { chain } from "../utils/chain";
import { Request, Response } from "express";
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
    console.log(response, "response");

    return res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error,
    });
  }
};

export { askQuestion };
