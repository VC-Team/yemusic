export type Song = {
  youtubeId: string;
  title: string;
  duration: string;
  publishedAt?: Date;
  thumbnail: object;
  channel: string;
  view: string;
};

export type SearchResult = {
  songs: Song[];
  token: string; // key to get more data (next/prev page result)
  apiKey: string; // api key to get more data (next/prev page result)
};

export type AudioResponse = {
  message?: string;
  audioUrl: string;
};

export type TParamsData = {
  urlString: string;
  method?: string;
  reqBody?: object;
};
