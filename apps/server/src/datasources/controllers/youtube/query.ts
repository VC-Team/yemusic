import { Request, Response } from 'express';

import { searchVideo, getAudio, getVideoTrending } from '@utils/controllers';
import { useHttpHandler } from '@utils/useHttpHandler';

export const listSong = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { search, token, apiKey } = req.body;
  const results = await searchVideo(search, token, apiKey);

  return res.status(200).json({
    data: results,
  });
});

export const song = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { youtubeId } = req.params;
  const result = await getAudio(youtubeId);

  return res.status(200).json({
    data: result,
  });
});

export const listSongTrending = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const songs = await getVideoTrending();

  return res.status(200).json({
    data: { songs },
  });
});
