import type { App } from "obsidian";
import type { IMessenger } from "../messenger/IMessenger";
import { t } from "../localizer/Localizer";

export interface ITracksPluginSettings {
  // Endpoint
  endpointType: EndpointType,
  endpointUrl: string,
  endpointUsername: string,
  endpointSecret: string,

  // Development/debug settings
  debugEnableConsoleLogging: boolean,

  // Methods
  getBasicToken(app: App, messenger: IMessenger): string;
}

export enum EndpointType {
  Tracks = "tracks"
}

export const DEFAULT_SETTINGS: ITracksPluginSettings = {
  // Endpoint
  endpointType: EndpointType.Tracks,
  endpointUrl: "",
  endpointUsername: "",
  endpointSecret: "",

  // Development/debug settings
  debugEnableConsoleLogging: false,

  // Methods
  getBasicToken(app: App, messenger: IMessenger): string {
    // todo: refactor this method. It doesn't belong here. It's doing too much
    let value = app.secretStorage.getSecret(this.endpointSecret);

    if (!value) {
      messenger.send("show_notice_error", t("notice.error-secret-not-found", {secret: this.endpointSecret}))
      return "";
    }

    const basic = `${this.endpointUsername}:${value}`;
    return btoa(basic)
  }
}
