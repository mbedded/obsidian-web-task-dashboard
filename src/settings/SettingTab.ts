import { App, PluginSettingTab, SecretComponent, SettingGroup } from "obsidian";
import TracksPlugin from "../main";
import { t } from "../localizer/Localizer";
import { type IMessenger, SettingsType } from "../messenger/IMessenger";

export class SettingTab extends PluginSettingTab {

  constructor(app: App, private plugin: TracksPlugin, private messenger: IMessenger) {
    super(app, plugin);
  }

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    this.addEndpointSettings(containerEl, this.plugin);
    this.addDevSettings(containerEl, this.plugin);
  }

  private sendSettingsChanged(type: SettingsType): void {
    this.messenger.send("settings_changed", {
      type: type,
      settings: this.plugin.settings
    });
  }

  private addEndpointSettings(containerEl: HTMLElement, plugin: TracksPlugin) {
    let sendSettingsChanged = () => this.sendSettingsChanged(SettingsType.Endpoint);

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
            sendSettingsChanged();
          })))
      .addSetting(setting => setting
        .setName(t("settings.endpoint-username-header"))
        .setDesc(t("settings.endpoint-username-description"))
        .addText(text => text
          .setValue(plugin.settings.endpoint.username)
          .onChange(async (value) => {
            plugin.settings.endpoint.username = value;
            await plugin.saveSettings();
            sendSettingsChanged();
          })))
      .addSetting(setting => setting
        .setName(t("settings.endpoint-secret-header"))
        .setDesc(t("settings.endpoint-secret-description"))
        .addComponent(el => new SecretComponent(this.app, el)
          .setValue(plugin.settings.endpoint.secret)
          .onChange(async (value) => {
            plugin.settings.endpoint.secret = value ?? "";
            await plugin.saveSettings();
            sendSettingsChanged();
          })
        )
      );
  }

  private addDevSettings(containerEl: HTMLElement, plugin: TracksPlugin) {
    let sendSettingsChanged = () => this.sendSettingsChanged(SettingsType.Debugging);

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
            sendSettingsChanged();
          });
        }));
  }
}
