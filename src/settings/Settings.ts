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
  debugEnableConsoleLogging: boolean
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
  debugEnableConsoleLogging: false
}
