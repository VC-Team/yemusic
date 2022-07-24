/* eslint-disable no-useless-escape */
import { youtube } from '@config/index';
import { TParamsData } from '@interface/index';
import axios from 'axios';

import decodeHex from './decodeHex';

export async function getData({ urlString, method = '', reqBody = {} }: TParamsData) {
  const dataRegex = /var\ ytInitialData\ \=\ \'(.*)\'\;<\/script>/;
  // const playerRegex = /var\ ytInitialPlayerResponse\ \=\ (.*)id\=\"player\"/s;

  const dateRegex = /publishDate":"(.*)","ownerChannelName/;
  const apiRegex = /"innertubeApiKey":"(.*?)"/;
  const url = new URL(urlString);
  let isAjax = false;
  let isDate = false;
  // const isSubtitles = false;

  if (url.searchParams.get('token')) {
    isAjax = true;
  }
  if (url.searchParams.get('type') === 'date') {
    isDate = true;
  }
  if (url.searchParams.get('type') === 'subtitles') {
    // isSubtitles = true;
  }

  if (method === 'POST') {
    isAjax = true;
  }

  const headers = youtube.headers;
  if (isAjax) {
    const data = {
      context: { client: { clientName: 'WEB', clientVersion: '2.20210401.08.00' } },
      continuation: url.searchParams.get('token'),
      ...reqBody,
    };
    return (await axios({ method: 'post', url: urlString, data: data, headers })).data;
  } else {
    const body = (await axios({ url: urlString, headers })).data;
    if (isDate) {
      const raw = dateRegex.exec(body)?.[1] || '{}';
      return raw;
    } else {
      const raw = dataRegex.exec(body)?.[1] || '{}';
      const apiKey = apiRegex.exec(body)?.[1] || '';

      const data = JSON.parse(decodeHex(raw));
      data.apiKey = apiKey;
      return data;
    }
  }
}
