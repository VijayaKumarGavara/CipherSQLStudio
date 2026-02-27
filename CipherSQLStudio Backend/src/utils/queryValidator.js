function validateQuery(query) {
  if (!query) throw new Error("Query cannot be empty.");

  let cleaned = query.replace(/--.*$/gm, "");

  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, "");

  cleaned = cleaned.trim();

  if (!cleaned.toLowerCase().startsWith("select")) {
    throw new Error("Only SELECT queries are allowed.");
  }

  const forbidden = ["drop", "delete", "update", "insert", "alter", "truncate"];
  const lower = cleaned.toLowerCase();
  for (let word of forbidden) {
    if (lower.includes(word)) {
      throw new Error("Dangerous query detected.");
    }
  }
}

module.exports = validateQuery;
