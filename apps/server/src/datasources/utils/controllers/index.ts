import { compareHash, generateHash } from './auth';
import { createToken, verifyToken } from './token';
import getAudio from './youtube/getAudio';
import getVideoTrending from './youtube/getVideoTrending';
import searchVideo from './youtube/searchVideo';

export { searchVideo, getAudio, getVideoTrending };
export const ytb = {
  searchVideo,
  getAudio,
  getVideoTrending,
};

export const yeToken = {
  createToken,
  verifyToken,
};

export const authUtils = {
  generateHash,
  compareHash,
};
