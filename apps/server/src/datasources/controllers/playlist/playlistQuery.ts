import { Request, Response } from 'express';

import { PlayList } from '@datasources/models';
import { useHttpHandler } from '@utils/helper';
import { Types } from 'mongoose';

export const getPlaylists = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id: owner } = req.user;

  const selectedFields = ['name', 'isLikedTrack'];
  const playlists = await PlayList.find({ owner, isDeleted: false }).select(selectedFields).lean();

  return res.status(200).json({ data: { playlists } });
});

export const getPlaylist = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id } = req.params;

  const limit = Number(req.query.limit) || 10;
  const pageIndex = Number(req.query.pageIndex) || 1;

  const playlists = await PlayList.aggregate([
    {
      $match: { _id: new Types.ObjectId(_id), isDeleted: false },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        owner: 1,
        isLikedTrack: 1,
        songs: {
          $slice: ['$songs', (pageIndex - 1) * limit, pageIndex * limit],
        },
      },
    },
    {
      $lookup: {
        from: 'songs',
        localField: 'songs',
        foreignField: '_id',
        as: 'songs',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
      },
    },
    {
      $unwind: '$owner',
    },
    {
      $project: {
        _id: 1,
        name: 1,
        isLikedTrack: 1,
        createdAt: 1,
        owner: {
          _id: 1,
          info: 1,
        },
        songs: 1,
      },
    },
  ]);

  const data = playlists.length ? { ...playlists[0], nextIndex: pageIndex + 1 } : null;
  return res.status(200).json({ data });
});
