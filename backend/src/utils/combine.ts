export function combineDocs(docs: any): string {
  if (!docs || docs.length === 0) {
    return "No relevant documents found.";
  }

  const validDocs = docs.filter((doc: any) => doc && doc.pageContent);

  if (validDocs.length === 0) {
    return "No valid document content found.";
  }

  return validDocs.map((doc: any) => doc.pageContent).join("\n\n");
}
