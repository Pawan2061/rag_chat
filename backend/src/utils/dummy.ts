// import fs from 'fs/promises';

// interface NotionBlock {
//   value?: {
//     id: string;
//     type: string;
//     properties?: {
//       title?: Array<Array<string>>;
//       [key: string]: any;
//     };
//     content?: string[];
//     [key: string]: any;
//   };
//   role?: string;
//   [key: string]: any;
// }

// interface NotionData {
//   block: {
//     [key: string]: NotionBlock;
//   };
// }

// interface CleanedBlock {
//   id: string;
//   type: string;
//   content: string;
//   children?: CleanedBlock[];
// }

// function extractTitleText(title: Array<Array<string>>): string {
//   return title.map(item => item[0]).join(' ').trim();
// }

// function processBlock(block: NotionBlock, allBlocks: { [key: string]: NotionBlock }): CleanedBlock | null {
//   if (!block.value) return null;

//   const { id, type, properties, content } = block.value;

//   // Extract text content
//   let textContent = '';
//   if (properties?.title) {
//     textContent = extractTitleText(properties.title);
//   }

//   // Create cleaned block
//   const cleanedBlock: CleanedBlock = {
//     id,
//     type,
//     content: textContent
//   };

//   // Process children if they exist
//   if (content && content.length > 0) {
//     const children = content
//       .map(childId => {
//         const childBlock = allBlocks[childId];
//         return childBlock ? processBlock(childBlock, allBlocks) : null;
//       })
//       .filter((block): block is CleanedBlock => block !== null);

//     if (children.length > 0) {
//       cleanedBlock.children = children;
//     }
//   }

//   return cleanedBlock;
// }

// async function cleanAndSaveNotionData(
//   inputPath: string,
//   outputPath: string = 'cleaned_notion_data.json'
// ): Promise<void> {
//   try {
//     // Read and parse input file
//     const data = await fs.readFile(inputPath, 'utf-8');
//     const parsedData = JSON.parse(data);

//     // If the data is nested under 'block', use that
//     const notionData = parsedData.block || parsedData;

//     // Find the root page block
//     const rootBlockId = Object.keys(notionData).find(key => {
//       const block = notionData[key];
//       return block.value?.type === 'page';
//     });

//     if (!rootBlockId) {
//       throw new Error('No page block found in the data');
//     }

//     // Process the document structure
//     const cleanedData = processBlock(notionData[rootBlockId], notionData);

//     if (!cleanedData) {
//       throw new Error('Failed to process the root block');
//     }

//     // Create a more readable structure
//     const finalOutput = {
//       title: cleanedData.content,
//       type: cleanedData.type,
//       blocks: cleanedData.children?.map(child => ({
//         type: child.type,
//         content: child.content,
//         children: child.children || []
//       })) || []
//     };

//     // Save processed data
//     await fs.writeFile(
//       outputPath,
//       JSON.stringify(finalOutput, null, 2),
//       'utf-8'
//     );

//     console.log(⁠ "Successfully processed Notion document" ⁠);
//     console.log(⁠ Cleaned data saved to ${outputPath} ⁠);

//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(⁠ Failed to process Notion data: ${error.message} ⁠);
//     }
//     throw error;
//   }
// }

// async function main() {
//   try {
//     await cleanAndSaveNotionData('test.json');
//   } catch (error) {
//     console.error('Error:', error);
//     process.exit(1);
//   }
// }

// main();
