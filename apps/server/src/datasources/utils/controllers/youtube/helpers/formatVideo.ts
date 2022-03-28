import { FormatVideo, FormatDraftVideo } from '../../../../interface';
import getVideoDate from '../getVideoDate';
import getDateFromText from './getDateFromText';

export default async function formatVideo(video: FormatVideo, speedDate = false) {
  try {
    const draftVideo: FormatDraftVideo =
      video.compactVideoRenderer || video.gridVideoRenderer || video.videoRenderer || video.playlistVideoRenderer;

    if (draftVideo) {
      // Get id
      const youtubeId: string = draftVideo.videoId;

      // Get thumbnail
      const lastThumbnailIdx: number = draftVideo.thumbnail?.thumbnails?.length - 1 || 0;
      const thumbnail: object = draftVideo.thumbnail?.thumbnails[lastThumbnailIdx] || {};

      // Get duration
      const duration: string = draftVideo.lengthText?.simpleText || draftVideo.lengthText?.runs[0].text;

      // Get title
      const title: string = draftVideo.title.simpleText || draftVideo.title.runs[0].text;

      // Get channel
      const channel = draftVideo.longBylineText?.runs[0].text || draftVideo.shortBylineText?.runs[0].text;

      // Get view
      const view = draftVideo.viewCountText.simpleText || draftVideo.viewCountText.runs[0].text;

      // publishedAt formatting

      let publishedAt: Date = new Date(Date.now());
      if (speedDate && draftVideo.publishedTimeText) {
        if (draftVideo.publishedTimeText.simpleText) {
          publishedAt = getDateFromText(draftVideo.publishedTimeText.simpleText);
        } else if (draftVideo.publishedTimeText.runs) {
          publishedAt = getDateFromText(draftVideo.publishedTimeText.runs[0].text);
        }
      } else {
        publishedAt = await getVideoDate(youtubeId);
      }

      return {
        youtubeId,
        title: title.trim(),
        duration,
        publishedAt,
        thumbnail,
        channel,
        view,
      };
    }

    return {
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
  } catch (e) {
    console.log('format video failed');
  }
}
