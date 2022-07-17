import { Types } from 'mongoose';

export type TPlayList = {
  name: string;
  desriction?: string;
  owner: Types.ObjectId;
  isLikedTrack?: boolean;
  songs?: string[];
};
