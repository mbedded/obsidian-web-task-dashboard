import { App, PluginSettingTab, SettingGroup } from "obsidian";
import TracksPlugin from "../main";
import { t } from "../localizer/Localizer";

export class SettingTab extends PluginSettingTab {
  private readonly plugin: TracksPlugin;

  constructor(app: App, plugin: TracksPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    SettingTab.addEndpointSettings(containerEl, this.plugin);
    SettingTab.addDevSettings(containerEl, this.plugin);
  }

  private static addEndpointSettings(containerEl: HTMLElement, plugin: TracksPlugin) {
    new SettingGroup(containerEl)
      .setHeading(t("settings.header-tracks-endpoint"))
      .addSetting(setting => setting
        .setName(t("settings.tracks-url-header"))
        .setDesc(t("settings.tracks-url-description"))
        .addText(text => text
          .setPlaceholder(t("settings.tracks-url-placeholder"))
          .setValue(plugin.settings.endpoint.url)
          .onChange(async (value) => {
            if (value.endsWith("/")) {
              value = value.slice(0, -1);
            }

            plugin.settings.endpoint.url = value;
            await plugin.saveSettings();
          })))
      .addSetting(setting => setting
        .setName(t("settings.tracks-username-header"))
        .setDesc(t("settings.tracks-username-description"))
        .addText(text => text
          .setValue(plugin.settings.endpoint.username)
          .onChange(async (value) => {
            plugin.settings.endpoint.username = value;
            await plugin.saveSettings();
          })))
      .addSetting(setting => setting
        .setName(t("settings.tracks-password-header"))
        .setDesc(t("settings.tracks-password-description"))
        .addText(text => {
            text.setValue(plugin.settings.endpoint.token)
            text.onChange(async (value) => {
              plugin.settings.endpoint.token = value;
              await plugin.saveSettings();
            });
            text.inputEl.type = "password";
          }
        ));
  }

  private static addDevSettings(containerEl: HTMLElement, plugin: TracksPlugin) {
    new SettingGroup(containerEl)
      .setHeading(t("settings.header-debugging"))
      .addSetting(x=>x
        .setName(t("settings.debug-console-log-header"))
        .setDesc(t("settings.debug-console-log-description"))
        .addToggle(x=> {
          x.setValue(plugin.settings.debug.enableConsoleLogging);
          x.onChange(async (value) =>{
            plugin.settings.debug.enableConsoleLogging = value;
            await plugin.saveSettings();
          });
        }));
  }
}
