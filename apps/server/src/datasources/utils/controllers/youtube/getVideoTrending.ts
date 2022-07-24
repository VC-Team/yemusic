import { TSong } from '@interface/index';

import { findValByKey, formatVideo, getData } from './helpers';

export default async function getVideoTrending(): Promise<Array<TSong>> {
  try {
    const songs: TSong[] = [];

    const data = await getData({
      urlString: 'https://www.youtube.com/youtubei/v1/browse',
      method: 'POST',
      reqBody: {
        browseId: 'FEtrending',
        params: process.env.PARAMS_YOUTUBE,
      },
    });

    const dataRes = findValByKey(
      data,
      'contents.twoColumnBrowseResultsRenderer.tabs.1.tabRenderer.content.sectionListRenderer.contents.0.itemSectionRenderer.contents.0.shelfRenderer.content.expandedShelfContentsRenderer.items'
    ) as Array<object>;

    for (let i = 0; i < dataRes.length; i++) {
      const formatted: TSong = await formatVideo(dataRes[i], true);
      if (formatted?.yId !== 'didyoumean') {
        songs.push(formatted);
      }
    }

    return songs;
  } catch (e) {
    console.log('trending songs error, e: ' + e);
  }
}
