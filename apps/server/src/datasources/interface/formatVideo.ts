type Thumbnail = {
  thumbnails: Array<object>;
};

type Children = {
  simpleText?: string;
  runs?: Runs[];
};

type Runs = {
  text: string;
};

export type FormatVideo = {
  compactVideoRenderer: object;
  gridVideoRenderer: object;
  videoRenderer: object;
  playlistVideoRenderer: object;
};

export type FormatDraftVideo = {
  videoId?: string;
  thumbnail?: Thumbnail;
  lengthText?: Children;
  title?: Children;
  longBylineText?: Children;
  shortBylineText?: Children;
  viewCountText?: Children;
  publishedTimeText?: Children;
};
