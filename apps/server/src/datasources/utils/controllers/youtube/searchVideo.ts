import { Video, SearchResult } from '../../../interface';
import { FormatVideo } from '../../../interface';
import findVal from './helpers/findVal';
import formatVideo from './helpers/formatVideo';
import getData from './helpers/getData';

export default async function searchVideo(terms: string, token?: string, apikey?: string): Promise<SearchResult> {
  try {
    let items: FormatVideo[] = [];
    const songs: Video[] = [];

    // initial songs search
    if (!token) {
      const data = await getData('https://m.youtube.com/results?videoEmbeddable=true&search_query=' + encodeURI(terms));

      token = findVal(data, 'token');
      items = findVal(data, 'itemSectionRenderer').contents;
    }
    // more songs
    else {
      const data = await getData('https://www.youtube.com/youtubei/v1/search?key=' + apikey + '&token=' + token);
      items = findVal(data.items, 'contents');
      token = data.token;
    }

    for (let i = 0; i < items.length; i++) {
      const formatted: Video = await formatVideo(items[i], true);
      if (formatted?.youtubeId !== 'didyoumean') {
        songs.push(formatted);
      }
    }

    return {
      songs,
      token,
      apikey,
    };
  } catch (e) {
    console.log(e);

    console.log('search songs error, terms: ' + terms);
  }
}
