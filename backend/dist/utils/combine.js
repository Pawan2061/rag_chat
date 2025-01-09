export function combineDocs(docs) {
    if (!docs || docs.length === 0) {
        return "No relevant documents found.";
    }
    const validDocs = docs.filter((doc) => doc && doc.pageContent);
    if (validDocs.length === 0) {
        return "No valid document content found.";
    }
    return validDocs.map((doc) => doc.pageContent).join("\n\n");
}
