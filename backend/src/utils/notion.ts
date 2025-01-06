// import { NotionAPI } from "notion-client";
// import { Client } from "@notionhq/client";

// import { NotionToMarkdown } from "notion-to-md";
// import puppeteer from "puppeteer";
// import fs from "fs-extra";

// // const notion = new Client({
// //   auth: "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",
// // });
// const client = new NotionAPI({
//   authToken: "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",
// });
// // @ts-ignore

// const n2m = new NotionToMarkdown({ notionClient: client });

// export async function convert() {
//   try {
//     const pageId = "c66d5236e8ea40df8af114f6d447ab48";
//     const mdBlocks = await n2m.pageToMarkdown(pageId);
//     const markdownContent = n2m.toMarkdownString(mdBlocks).content;

//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(`<pre>${markdownContent}</pre>`);
//     await page.pdf({ path: "notion-page.pdf", format: "A4" });

//     await browser.close();
//     console.log("PDF saved as notion-page.pdf");
//   } catch (error) {
//     console.error("PDF generation failed:", error);
//   }
// }
