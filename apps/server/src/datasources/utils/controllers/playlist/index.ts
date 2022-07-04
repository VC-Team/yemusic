import { PlayList } from '@datasources/models';

export async function checkPlaylistExisted(query: object) {
  const queriedPlaylist = await PlayList.findOne(query).select('_id').lean();

  console.log(queriedPlaylist);

  if (!queriedPlaylist) {
    throw {
      errorCode: 'E-04',
      message: 'Playlist not found!',
    };
  }
}
