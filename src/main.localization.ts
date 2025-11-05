/**
 * Localization has been outsourced to this file to keep the code and implementation together.
 * Especially the header and method may become long when more languages are added.
 * "Localizify" provides a singleton, so it's safe to configure it here.
 */

import localizify from "localizify";
import lang_en from "../locales/locale.en.json";

const FALLBACK_LANGUAGE: string = "en"

export function setupLocalization() {
  // Setup languages
  localizify
    .add("en", lang_en);

  // Get UI language or fallback
  let locale = window.localStorage.getItem('language');
  if (!locale || !localizify.isLocale(locale)) {
    locale = FALLBACK_LANGUAGE;
  }

  localizify.setLocale(locale);
}
