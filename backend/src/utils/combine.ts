export function combineDocs(docs: any[]) {
  console.log("almost isnide");
  console.log(docs, "docs here");

  return docs.map((doc) => doc.pageContent).join("\n\n");
}
