import { Song } from '@datasources/models';
import { Tsong } from '@utils/interface';

export async function getSongId(song: Tsong) {
  const { yId } = song;
  const queriedSong = await Song.findOne({ yId }).select('_id').lean();

  if (queriedSong) return queriedSong._id;

  const songDoc = await Song.create(song);
  return songDoc._id;
}
