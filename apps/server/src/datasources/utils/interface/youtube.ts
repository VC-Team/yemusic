type Thumbnail = {
  thumbnails: Array<object>;
};

type DataVideoItem = {
  simpleText?: string;
  runs?: Runs[];
};

type Runs = {
  text: string;
};

export type TDataVideo = {
  videoId?: string;
  thumbnail?: Thumbnail;
  lengthText?: DataVideoItem;
  title?: DataVideoItem;
  longBylineText?: DataVideoItem;
  shortBylineText?: DataVideoItem;
  viewCountText?: DataVideoItem;
  publishedTimeText?: DataVideoItem;
};

export type TVideo = {
  compactVideoRenderer?: TDataVideo;
  gridVideoRenderer?: TDataVideo;
  videoRenderer?: TDataVideo;
  playlistVideoRenderer?: TDataVideo;
};

export type TResVideo = {
  yId: string;
  title: string;
  artist?: string;
  duration: string;
  publishedAt?: Date;
  views?: number;
  thumbnail: object;
  channel: string;
  view: string;
};

export type TSong = {
  yId: string;
  title: string;
  duration: string;
  publishedAt?: Date;
  thumbnail: object;
  channel: string;
  view: string;
};

export type TSearchResult = {
  songs: TSong[];
  token: string; // key to get more data (next/prev page result)
  apiKey: string; // api key to get more data (next/prev page result)
};

export type TAudioResponse = {
  message?: string;
  audioUrl: string;
};

export type TParamsData = {
  urlString: string;
  method?: string;
  reqBody?: object;
};
