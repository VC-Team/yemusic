import { HttpServerConfig, Youtube, MongoDB } from './type.config';

export const container: HttpServerConfig = {
  hostName: process.env.API_HOSTNAME || 'http://localhost',
  port: Number(process.env.API_PORT || 3000),
  logger: {
    level: process.env.LOGGING_LEVEL || 'debug',
  },
};

export const youtube: Youtube = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'x-youtube-client-name': 1,
    'x-youtube-client-version': '2.20220325.00.00',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
  },
};

export const mongoDB: MongoDB = {
  database_test: 'mongodb://localhost/db_yemusic_test',
  database: process.env.YEMUSIC_DB_CONNECTION_STRING || 'mongodb://localhost/db_yemusic_test',
  mongoOptions: {},
};

/* Setting the expiration time for the refresh token (a date 10 days from now). */
export const refreshTokenExpires: number = Date.now() + 24 * 60 * 60 * 10000;
