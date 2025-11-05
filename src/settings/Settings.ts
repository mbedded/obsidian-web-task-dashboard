export interface TracksPluginSettings {
  tracksUrl: string;
  tracksUsername: string;
  tracksToken: string;

  getBasicToken(): string;
}

export const DEFAULT_SETTINGS: TracksPluginSettings = {
  tracksUrl: "",
  tracksUsername: "",
  tracksToken: "",
  getBasicToken(): string {
    const basic = `${this.tracksUsername}:${this.tracksToken}`;
    return btoa(basic)
  },
}
