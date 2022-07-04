type TThumbnail = {
  url: number;
  width: number;
  height: number;
};

type Tsong = {
  yId: string;
  thumbnail: TThumbnail;
  duration: string;
  title: string;
  channel: string;
  view: string;
  publishedAt: string;
};

export type TPlayList = {
  _id?: string;
  name?: string;
  description?: string;
  song?: Tsong;
  songId?: string;
};

export type TCreatePlaylist = {
  name: string;
  description?: string;
  owner?: string;
  isLikedTrack?: boolean;
  songs?: [Tsong];
};

export type TUpdatePlaylist = {
  name?: string;
  description?: string;
};
