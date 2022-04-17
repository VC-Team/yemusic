import * as ytdl from 'ytdl-core';

const mimeType = /audio\/mp4;/;
import { AudioResponse } from '../../interface/youtube';

export default async function getAudio(youtubeId: string): Promise<AudioResponse> {
  try {
    const info = await ytdl.getInfo(youtubeId);
    const audioFormats = await ytdl.filterFormats(info.formats, 'audioonly');
    const audio = audioFormats.find(audio => mimeType.exec(audio.mimeType));

    const audioUrl = audio ? audio.url : audioFormats?.[0]?.url;
    return audioFormats.length ? { data: { audioUrl } } : { data: {} };
  } catch (error) {
    return {
      message: error.message,
      data: {},
    };
  }
}
