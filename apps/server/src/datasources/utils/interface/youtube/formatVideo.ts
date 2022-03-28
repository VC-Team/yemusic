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

export type DataVideo = {
  videoId?: string;
  thumbnail?: Thumbnail;
  lengthText?: DataVideoItem;
  title?: DataVideoItem;
  longBylineText?: DataVideoItem;
  shortBylineText?: DataVideoItem;
  viewCountText?: DataVideoItem;
  publishedTimeText?: DataVideoItem;
};

export type Video = {
  compactVideoRenderer: DataVideo;
  gridVideoRenderer: DataVideo;
  videoRenderer: DataVideo;
  playlistVideoRenderer: DataVideo;
};

export type ResVideo = {
  youtubeId: string;
  title: string;
  artist?: string;
  duration: string;
  publishedAt?: Date;
  views?: number;
  thumbnail: object;
  channel: string;
  view: string;
};
