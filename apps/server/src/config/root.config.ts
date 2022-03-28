import { HttpServerConfig } from './type.config';

const config: HttpServerConfig = {
  hostName: process.env.API_HOSTNAME || 'http://localhost',
  port: Number(process.env.API_PORT || 3000),
  logger: {
    level: process.env.LOGGING_LEVEL || 'debug',
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'x-youtube-client-name': 1,
    'x-youtube-client-version': '2.20200911.04.00',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
  },
};

export default config;
