import { Song, SearchResult, Video } from '../../interface/youtube';
import findVal from './helpers/findVal';
import formatVideo from './helpers/formatVideo';
import getData from './helpers/getData';

export default async function searchVideo(terms: string, token?: string, apiKey?: string): Promise<SearchResult> {
  try {
    let items: Video[] = [];
    const songs: Song[] = [];

    // initial songs search
    if (!token) {
      const data = await getData({
        urlString: 'https://m.youtube.com/results?videoEmbeddable=true&search_query=' + encodeURI(terms),
      });
      token = findVal(data, 'token');
      items = findVal(data, 'itemSectionRenderer')?.contents;
    }
    // more songs
    else {
      const data = await getData({
        urlString: 'https://www.youtube.com/youtubei/v1/search?key=' + apiKey + '&token=' + token,
      });
      token = findVal(data, 'token');
      items = findVal(data, 'itemSectionRenderer')?.contents;
    }

    for (let i = 0; i < items.length; i++) {
      const formatted: Song = await formatVideo(items[i], true);
      if (formatted?.youtubeId !== 'didyoumean') {
        songs.push(formatted);
      }
    }

    return {
      songs,
      token,
      apiKey,
    };
  } catch (e) {
    console.log(e);
    console.log('search songs error, terms: ' + terms);
  }
}
