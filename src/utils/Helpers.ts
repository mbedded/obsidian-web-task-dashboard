import type { App } from "obsidian";
import type { IMessenger } from "../messenger/IMessenger";
import { t } from "../localizer/Localizer";
import type { ITracksPluginSettings } from "../settings/Settings";

/**
 * A utility class containing helper methods for general-purpose usage.
 */
export class Helpers {

  private constructor() {
    // Prevent instantiation
  }

  /**
   * Creates a deep copy of the provided instance.
   *
   * @param {T} instance - The object to be cloned.
   * @return {T} A new object that is a deep copy of the provided instance.
   */
  public static clone<T>(instance: T): T {
    return structuredClone(instance);
  }

  /**
   * Checks if the given title is null, undefined or consists only of whitespace characters.
   *
   * @param {string} title - The string to be checked for emptiness.
   * @return {boolean} True if the title is null, undefined, or empty; false otherwise.
   */
  public static isTitleEmpty(title: string): boolean {
    return title == null || title.trim().length == 0;
  }

  /**
   * Creates a Base64-encoded HTTP Basic authentication token from the configured
   * endpoint credentials.
   *
   * Retrieves the endpoint secret from Obsidian's secret storage using the key
   * specified in settings. If the secret is not found, an error notice is sent
   * and an empty string is returned.
   *
   * @param {App} app - The Obsidian application instance used to access secret storage.
   * @param {IMessenger} messenger - Messenger used to display notices to the user.
   * @param {ITracksPluginSettings} settings - Plugin settings containing endpoint credentials.
   * @return {string} The Base64-encoded basic auth token, or an empty string if the secret is unavailable.
   */
  public static createBasicToken(app: App, messenger: IMessenger, settings: ITracksPluginSettings): string {
    let value = app.secretStorage.getSecret(settings.endpointSecret);

    if (!value) {
      messenger.send("show_notice_error", t("notice.error-secret-not-found", {secret: settings.endpointSecret}))
      return "";
    }

    const basic = `${settings.endpointUsername}:${value}`;
    return btoa(basic)
  }
}
