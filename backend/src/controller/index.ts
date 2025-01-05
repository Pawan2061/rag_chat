import { chain } from "../utils/chain";
import { Request, Response } from "express";
import { createChain } from "../utils/dummy";

const askQuestion = async (req: Request, res: Response): Promise<any> => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({
        message: "Question is Required",
      });
    }
    console.log("invoking the chain");
    console.log("thge question is ", question);
    const response = await chain.invoke({
      question,
    });
    console.log(response, "response");

    return res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      error: error,
    });
  }

  //   const { topic } = req.body;
  //   if (!topic) {
  //     res.status(400).json({ error: "Topic is required" });
  //     return;
  //   }
  //   const chain = createChain(topic);
  //   res.writeHead(200, {
  //     "Content-Type": "text/plain",
  //     "Transfer-Encoding": "chunked",
  //   });
  //   const stream = await chain.stream({ topic });
  //   for await (const chunk of stream) {
  //     res.write(chunk);
  //     console.log(`Sent chunk: ${chunk}`);
  //   }
  //   res.end();
};

export { askQuestion };
