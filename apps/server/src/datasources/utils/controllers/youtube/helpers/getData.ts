/* eslint-disable no-useless-escape */
import axios from 'axios';

import config from '../../../../../config/root.config';
import { GetData } from '../../../interface/youtube';
import decodeHex from './decodeHex';

export default async function getData({ urlString, method = '', reqBody = {}, reqHeaders = {} }: GetData) {
  const dataRegex = /var\ ytInitialData\ \=\ \'(.*)\'\;<\/script>/;
  // const playerRegex = /var\ ytInitialPlayerResponse\ \=\ (.*)id\=\"player\"/s;

  const dateRegex = /publishDate":"(.*)","ownerChannelName/;
  const apiRegex = /"innertubeApiKey":"(.*?)"/;
  const url = new URL(urlString);
  let isAjax = false;
  let isDate = false;
  // const isSubtitles = false;
  let body;
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

  let headers;
  if (isAjax) {
    const data = {
      context: { client: { clientName: 'WEB', clientVersion: '2.20210401.08.00' } },
      continuation: url.searchParams.get('token'),
      ...reqBody,
    };
    headers = {
      headers: {
        ...reqHeaders,
      },
    };

    body = (await axios({ method: 'post', url: urlString, data: data, headers })).data;

    return body;
  } else {
    headers = {
      headers: {
        ...config.headers,
        ...reqHeaders,
      },
    };
    body = (await axios({ url: urlString, headers })).data;
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
