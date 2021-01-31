export function getDefaultLocale(languages: readonly string[]): string {
  if (languages.find((l) => l === "de" || l.includes("de-"))) {
    return "de"
  }
  if (languages.find((l) => l === "se" || "sv-SE")) {
    return "se"
  }
  return "en"
}
