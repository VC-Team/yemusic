import { TAudioResponse } from '@utils/interface';
import * as ytdl from 'ytdl-core';

const mimeType = /audio\/mp4;/;

export default async function getAudio(yId: string): Promise<TAudioResponse> {
  try {
    const info = await ytdl.getInfo(yId);
    const audioFormats = await ytdl.filterFormats(info.formats, 'audioonly');
    const audio = audioFormats.find(audio => mimeType.exec(audio.mimeType));

    const audioUrl = audio ? audio.url : audioFormats?.[0]?.url;
    return audioFormats.length ? { audioUrl } : { audioUrl: null };
  } catch (error) {
    return {
      message: error.message,
      audioUrl: null,
    };
  }
}
