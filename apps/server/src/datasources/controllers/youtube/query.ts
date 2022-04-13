import { Request, Response, NextFunction } from 'express';

import { ytb } from '../../utils';

export const listSong = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { search, token, apiKey } = req.body;

    const results = await ytb.searchVideo(search, token, apiKey);

    return res.status(200).json({
      isSuccess: true,
      results,
    });
  } catch (error) {
    next(error);
  }
};

export const song = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { youtubeId } = req.params;

    const result = await ytb.getAudio(youtubeId);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const listSongTrending = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const result = await ytb.getVideoTrending();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
