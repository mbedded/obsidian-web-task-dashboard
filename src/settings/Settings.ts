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
  getBasicToken(): string;
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
  getBasicToken(): string {
    const basic = `${this.endpoint.username}:${this.endpoint.secret}`;
    return btoa(basic)
  }
}
