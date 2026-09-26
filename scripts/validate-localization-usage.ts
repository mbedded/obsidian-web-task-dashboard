import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { LocalizerParser } from "../src/localizer/LocalizerParser";

const SOURCE_LANGUAGE = "en";
const SOURCE_DIR = "src";
const EXPECTED_QUOTE = "\"";

function collectTsFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...collectTsFiles(fullPath));
      continue;
    }

    if (stats.isFile() && (fullPath.endsWith(".ts") || fullPath.endsWith(".svelte"))) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractLocalizationKeysFromFile(filePath: string): string[] {
  const content = readFileSync(filePath, "utf8");

  const keys = new Set<string>();

  const regex = /\bt\((?<quote>["'])(?<key>[^"']+)\k<quote>[^)]*\)/g;

  for (const match of content.matchAll(regex)) {
    const quote = match.groups?.quote;
    const key = match.groups?.key;

    if (!key || !quote) {
      continue;
    }

    if (quote !== EXPECTED_QUOTE) {
      console.error(`Invalid quote style in "${filePath}" for localization key "${key}". Use double quotes.`);
      process.exitCode = 1;
    }

    keys.add(key);
  }

  return [...keys];
}

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
  const sourceKeySet = new Set(sourceKeys);

  const usedKeys = new Set<string>();
  const missingKeysByFile = new Map<string, string[]>();

  for (const filePath of collectTsFiles(SOURCE_DIR)) {
    const fileKeys = extractLocalizationKeysFromFile(filePath);

    for (const key of fileKeys) {
      usedKeys.add(key);
    }

    const missingKeys = fileKeys
      .filter((key) => !sourceKeySet.has(key))
      .sort((a, b) => a.localeCompare(b));

    if (missingKeys.length > 0) {
      missingKeysByFile.set(filePath, missingKeys);
    }
  }

  const usedKeyList = [...usedKeys].sort((a, b) => a.localeCompare(b));
  const unusedKeys = sortedDifference(sourceKeys, usedKeyList);

  let hasErrors = false;

  if (missingKeysByFile.size > 0) {
    hasErrors = true;

    for (const [filePath, missingKeys] of [...missingKeysByFile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
      printKeyList(`Missing localization keys used in "${filePath}":`, missingKeys);
    }
  }

  printKeyList("Unused localization keys:", unusedKeys);

  if (hasErrors) {
    console.error("\nLocalization usage validation failed.");
    process.exit(1);
  }

  console.log("Localization usage validation passed. All used keys exist in EN.");
}

main();
