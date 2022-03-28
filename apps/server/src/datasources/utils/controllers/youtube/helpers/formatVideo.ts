import { Video, DataVideo, ResVideo } from '../../../interface/youtube';
import getVideoDate from '../getVideoDate';
import getDateFromText from './getDateFromText';

export default async function formatVideo(video: Video, speedDate = false): Promise<ResVideo> {
  try {
    const dataVideo: DataVideo =
      video.compactVideoRenderer || video.gridVideoRenderer || video.videoRenderer || video.playlistVideoRenderer;

    let resVideo: ResVideo = {
      youtubeId: 'didyoumean',
      title: '',
      artist: '',
      duration: '',
      publishedAt: new Date(Date.now()),
      views: 0,
      thumbnail: {},
      channel: '',
      view: '',
    };

    if (dataVideo) {
      const lastThumbnailIdx: number = dataVideo.thumbnail?.thumbnails?.length - 1 || 0;

      resVideo = {
        youtubeId: dataVideo.videoId,
        thumbnail: dataVideo.thumbnail?.thumbnails?.[lastThumbnailIdx] || {},
        duration: dataVideo.lengthText?.simpleText || dataVideo.lengthText?.runs[0]?.text || '',
        title: dataVideo.title?.simpleText || dataVideo.title?.runs?.[0]?.text || '',
        channel: dataVideo.longBylineText?.runs?.[0]?.text || dataVideo.shortBylineText?.runs?.[0]?.text || '',
        view: dataVideo.viewCountText?.simpleText || dataVideo.viewCountText?.runs?.[0]?.text || '',
      };

      // publishedAt formatting
      let publishedAt: Date = new Date(Date.now());
      if (speedDate && dataVideo.publishedTimeText) {
        if (dataVideo.publishedTimeText?.simpleText) {
          publishedAt = getDateFromText(dataVideo.publishedTimeText.simpleText);
        } else if (dataVideo.publishedTimeText?.runs) {
          publishedAt = getDateFromText(dataVideo.publishedTimeText.runs?.[0]?.text);
        }
      } else {
        publishedAt = await getVideoDate(resVideo?.youtubeId);
      }

      return {
        ...resVideo,
        publishedAt,
      };
    }

    return resVideo;
  } catch (e) {
    console.log('format video failed');
  }
}
