import { TSong, TSearchResult, TVideo } from '@interface/index';

import { getData, findVal, formatVideo } from './helpers';

export default async function searchVideo(terms: string, token?: string, apiKey?: string): Promise<TSearchResult> {
  try {
    let items: TVideo[] = [];
    const songs: TSong[] = [];
    let key: string = apiKey;

    // initial songs search
    if (!token) {
      const data = await getData({
        urlString: 'https://m.youtube.com/results?videoEmbeddable=true&search_query=' + encodeURI(terms),
      });

      key = data.apiKey;
      token = findVal(data, 'token');
      items = findVal(data, 'itemSectionRenderer')?.contents;
    }
    // more songs
    else {
      const data = await getData({
        urlString: 'https://www.youtube.com/youtubei/v1/search?key=' + key + '&token=' + token,
      });
      token = findVal(data, 'token');
      items = findVal(data, 'itemSectionRenderer')?.contents;
    }

    for (let i = 0; i < items.length; i++) {
      const formatted: TSong = await formatVideo(items[i], true);
      if (formatted?.yId !== 'didyoumean') {
        songs.push(formatted);
      }
    }

    return {
      songs,
      token,
      apiKey: key,
    };
  } catch (e) {
    console.log(e);
    console.log('search songs error, terms: ' + terms);
  }
}
