import { LocalizerParser } from "../src/localizer/LocalizerParser";

const SOURCE_LANGUAGE = "en";

function sortedDifference(left: string[], right: string[]): string[] {
  const rightSet = new Set(right);

  return left
    .filter((key) => !rightSet.has(key))
    .sort((a, b) => a.localeCompare(b));
}

function printKeyList(title: string, keys: string[]): void {
  if (keys.length === 0) {
    return;
  }

  console.error(`\n${title}`);

  for (const key of keys) {
    console.error(`  - ${key}`);
  }
}

function main(): void {
  const parser = new LocalizerParser();
  const parsedFiles = parser.getParsedFiles();

  const sourceTranslations = parsedFiles[SOURCE_LANGUAGE];

  if (!sourceTranslations) {
    console.error(`Localization validation failed: source language "${SOURCE_LANGUAGE}" was not found.`);
    process.exit(1);
  }

  const sourceKeys = Object.keys(sourceTranslations).sort((a, b) => a.localeCompare(b));
  let hasErrors = false;

  for (const [language, translations] of Object.entries(parsedFiles)) {
    if (language === SOURCE_LANGUAGE) {
      continue;
    }

    const languageKeys = Object.keys(translations).sort((a, b) => a.localeCompare(b));

    const missingKeys = sortedDifference(sourceKeys, languageKeys);
    const extraKeys = sortedDifference(languageKeys, sourceKeys);

    if (missingKeys.length > 0 || extraKeys.length > 0) {
      hasErrors = true;

      console.error(`\nLocalization key mismatch for language "${language}".`);
      printKeyList(`Missing keys in "${language}":`, missingKeys);
      printKeyList(`Extra keys in "${language}" not defined in "${SOURCE_LANGUAGE}":`, extraKeys);
    }
  }

  if (hasErrors) {
    console.error("\nLocalization validation failed.");
    process.exit(1);
  }

  console.log("Localization validation passed. All languages match the EN key set.");
}

main();
