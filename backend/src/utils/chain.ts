import "dotenv/config";

import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { combineDocs } from "./combine";
import { model } from "./model";
import { retriever } from "./retriever";

const standaloneQuestionTemplate = `Given  question, convert the question to a standalone question. 

question: {question} 
standalone question:`;

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
  standaloneQuestionTemplate
);
const answerTemplate: string = `Use the following pieces of context to answer the question. 
If you don't know or can't find the answer in the context try to match the word from the llm itself without the context ,and only say explicitly if the context is wholly outside the data provided.

context: {context}


Question: {question}
Provide your answer with relevant details from the context. Include specific references 
where possible. If multiple pieces of context contain relevant information, synthesize them.
Answer:""" `;

const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(model)
  .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  (prevResult) => {
    console.log(prevResult, "prev result here");

    return prevResult.standalone_question;
  },
  async (standalone_question) => {
    const retrievedDocs = await retriever.invoke(standalone_question);
    console.log(retrievedDocs, "retrieved docs here");
    return retrievedDocs;
  },

  combineDocs,
]);

const answerChain = answerPrompt
  .pipe(model)
  .pipe(new StringOutputParser())

  .pipe(async (output) => {
    console.log(output, "output here");

    return output;
  });

const chain = RunnableSequence.from([
  {
    standalone_question: standaloneQuestionChain,
    original_input: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,

    question: ({ original_input }) => {
      return original_input.question;
    },
  },
  answerChain,
]);

export { chain };
