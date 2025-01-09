import "dotenv/config";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnablePassthrough, RunnableSequence, } from "@langchain/core/runnables";
import { combineDocs } from "./combine";
import { model } from "./model";
import { retriever } from "./retriever";
const standaloneQuestionTemplate = `Given  question, convert the question to a standalone question. 

question: {question} 
standalone question:`;
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);
const answerTemplate = `You are an AI assistant that provides direct, concise, and well-structured answers.  

Use the given context to generate an accurate response. If the context lacks relevant details, generate a well-informed answer using your own knowledge without explicitly stating that the context is insufficient.  

Provide a structured response that directly answers the question, avoiding unnecessary introductions or disclaimers.  

### Context:  
{context}  

### Question:  
{question}  

### Answer:  `;
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);
const standaloneQuestionChain = standaloneQuestionPrompt
    .pipe(model)
    .pipe(new StringOutputParser());
const retrieverChain = RunnableSequence.from([
    (prevResult) => {
        return prevResult.standalone_question;
    },
    async (standalone_question) => {
        const retrievedDocs = await retriever.invoke(standalone_question);
        return retrievedDocs;
    },
    combineDocs,
]);
const answerChain = answerPrompt
    .pipe(model)
    .pipe(new StringOutputParser())
    .pipe(async (output) => {
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
