import { App, PluginSettingTab, SecretComponent, SettingGroup, TextComponent } from "obsidian";
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

    this.addEndpointSettings(containerEl, this.plugin);
    SettingTab.addDevSettings(containerEl, this.plugin);
  }

  private addEndpointSettings(containerEl: HTMLElement, plugin: TracksPlugin) {
    new SettingGroup(containerEl)
      .setHeading(t("settings.header-endpoint"))
      .addSetting(setting => setting
        .setName(t("settings.endpoint-url-header"))
        .setDesc(t("settings.endpoint-url-description"))
        .addText(text => text
          .setPlaceholder(t("settings.endpoint-url-placeholder"))
          .setValue(plugin.settings.endpoint.url)
          .onChange(async (value) => {
            if (value.endsWith("/")) {
              value = value.slice(0, -1);
            }

            plugin.settings.endpoint.url = value;
            await plugin.saveSettings();
          })))
      .addSetting(setting => setting
        .setName(t("settings.endpoint-username-header"))
        .setDesc(t("settings.endpoint-username-description"))
        .addText(text => text
          .setValue(plugin.settings.endpoint.username)
          .onChange(async (value) => {
            plugin.settings.endpoint.username = value;
            await plugin.saveSettings();
          })))
      .addSetting(setting => setting
          .setName(t("settings.endpoint-secret-header"))
          .setDesc(t("settings.endpoint-secret-description"))
          .addComponent(el => new SecretComponent(this.app, el)
            .setValue(plugin.settings.endpoint.secret)
            .onChange(async (value) => {
              plugin.settings.endpoint.secret = value ?? "";
              await plugin.saveSettings();
            })
          )
      );
  }

  private static addDevSettings(containerEl: HTMLElement, plugin: TracksPlugin) {
    new SettingGroup(containerEl)
      .setHeading(t("settings.header-debugging"))
      .addSetting(x => x
        .setName(t("settings.debug-console-log-header"))
        .setDesc(t("settings.debug-console-log-description"))
        .addToggle(x => {
          x.setValue(plugin.settings.debug.enableConsoleLogging);
          x.onChange(async (value) => {
            plugin.settings.debug.enableConsoleLogging = value;
            await plugin.saveSettings();
          });
        }));
  }
}
