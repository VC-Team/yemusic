import { Request, Response } from 'express';

import { PlayList } from '@datasources/models';
import { TPlayList, TCreatePlaylist } from '@interface/playlist';
import { getSongId, checkPlaylistExisted } from '@utils/controllers';
import { useHttpHandler } from '@utils/helper';

export const createPlaylist = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id: owner } = req.user;

  const { name, description, song }: TPlayList = req.body;

  const createData: TCreatePlaylist = {
    name,
    description,
    owner,
  };

  if (song) {
    const songId = await getSongId(song);
    Object.assign(createData, { songs: [songId] });
  }

  const playlist = await PlayList.create(createData);

  return res.status(200).json({ data: { playlist } });
});

export const updatePlaylist = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id: owner } = req.user;

  const { _id, name, description }: TPlayList = req.body;
  const updateData = {
    name,
    description,
  };

  await checkPlaylistExisted({ _id, owner });

  await PlayList.updateOne({ _id }, { $set: updateData });

  return res.status(200).json({ message: 'Update playlist successfully' });
});

export const addSong = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id: owner } = req.user;
  const { _id, song }: TPlayList = req.body;

  await checkPlaylistExisted({ _id, owner });

  const songId = await getSongId(song);
  await PlayList.updateOne({ _id }, { $addToSet: { songs: songId } });

  return res.status(200).json({ message: 'Add song to playlist successfully' });
});

export const removeSong = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id: owner } = req.user;
  const { _id, songId }: TPlayList = req.body;

  await checkPlaylistExisted({ _id, owner });

  await PlayList.updateOne({ _id }, { $pull: { songs: songId } });

  return res.status(200).json({ message: 'Remove song from playlist successfully' });
});

export const deletePlaylist = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id: owner } = req.user;
  const { _id }: TPlayList = req.body;

  await checkPlaylistExisted({ _id, owner, isDeleted: true, isLikedTrack: false });

  await PlayList.updateOne({ _id }, { $set: { isDeleted: true } });

  return res.status(200).json({ message: 'Delete playlist successfully' });
});

export const restorePlaylist = useHttpHandler(async (req: Request, res: Response): Promise<Response> => {
  const { _id: owner } = req.user;
  const { _id }: TPlayList = req.body;

  await checkPlaylistExisted({ _id, owner, isDeleted: false });

  await PlayList.updateOne({ _id }, { $set: { isDeleted: false } });

  return res.status(200).json({ message: 'Restore playlist successfully' });
});
