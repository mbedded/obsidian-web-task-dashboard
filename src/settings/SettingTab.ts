import { App, PluginSettingTab, type SettingDefinitionItem } from "obsidian";
import { t } from "../localizer/Localizer";
import type TracksPlugin from "../main";

export class SettingTab extends PluginSettingTab {

  constructor(app: App, plugin: TracksPlugin) {
    super(app, plugin);
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      this.getEndpointSettingsGroup(),
      this.getDebugSettingsGroup()
    ];
  }

  private getEndpointSettingsGroup(): SettingDefinitionItem {
    return {
      // Endpoint Group
      heading: t("settings.header-endpoint"),
      name: t("settings.header-endpoint"),
      type: "group",
      items: [
        {
          // Url
          name: t("settings.endpoint-url-header"),
          desc: t("settings.endpoint-url-description"),
          control: {
            type: "text",
            placeholder: t("settings.endpoint-url-placeholder"),
            key: "endpointUrl"
          }
        },
        // Username
        {
          name: t("settings.endpoint-username-header"),
          desc: t("settings.endpoint-username-description"),
          control: {
            type: "text",
            key: "endpointUsername"
          }
        },
        // Secret
        {
          name: t("settings.endpoint-secret-header"),
          desc: t("settings.endpoint-secret-description"),
          control: {
            type: "secret",
            key: "endpointSecret"
          }
        }
      ]
    }
  }

  private getDebugSettingsGroup(): SettingDefinitionItem {
    return {
      // Debug Group
      heading: t("settings.header-debugging"),
      name: t("settings.header-debugging"),
      type: "group",
      items: [
        {
          // Enable console logging
          name: t("settings.debug-console-log-header"),
          desc: t("settings.debug-console-log-description"),
          control: {
            type: "toggle",
            key: "debugEnableConsoleLogging"
          }
        }
      ]
    }
  }

}
