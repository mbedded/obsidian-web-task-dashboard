import type { App } from "obsidian";
import type { IMessenger } from "../messenger/IMessenger";
import { t } from "../localizer/Localizer";

export interface ITracksPluginSettings {
  // A version to enable migrations if breaking changes are made in the future
  version: number;
  // Endpoint settings
  endpoint: {
    type: EndpointType;
    url: string;
    username: string;
    secret: string;
  },
  // Development/Debug settings
  debug: {
    enableConsoleLogging: boolean;
  },

  // Methods
  getBasicToken(app: App, messenger: IMessenger): string;
}

export enum EndpointType {
  Tracks = "tracks"
}

export const DEFAULT_SETTINGS: ITracksPluginSettings = {
  // Properties
  version: 1,
  endpoint: {
    type: EndpointType.Tracks,
    url: "",
    username: "",
    secret: "",
  },
  debug: {
    enableConsoleLogging: false
  },

  // Methods
  getBasicToken(app: App, messenger: IMessenger): string {
    // todo: refactor this method. It doesn't belong here. It's doing too much
    let value = app.secretStorage.getSecret(this.endpoint.secret);

    if (!value) {
      messenger.send("show_notice_error", t("notice.error-secret-not-found", {secret: this.endpoint.secret}))
      return "";
    }

    const basic = `${this.endpoint.username}:${value}`;
    return btoa(basic)
  }
}
