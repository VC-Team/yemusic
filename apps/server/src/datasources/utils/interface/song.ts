type TThumbnail = {
  url: number;
  width: number;
  height: number;
};

export type Tsong = {
  yId: string;
  thumbnail: TThumbnail;
  duration: string;
  title: string;
  channel: string;
  view: string;
  publishedAt: string;
};
