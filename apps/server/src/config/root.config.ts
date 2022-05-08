import * as ms from 'ms';

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
  database_test:
    process.env.YEMUSIC_DB_TEST ||
    'mongodb+srv://vcteam:vcteam1122@cluster0.dcwmg.mongodb.net/test?retryWrites=true&w=majority',
  database_host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DEFAULT || 'db_yemusic',
  database_url: process.env.YEMUSIC_DB_CONNECTION_STRING,
  mongoOptions: {},
};

export const refreshTokenExpires: number = Date.now() + 24 * 60 * 60 * 10000;

export const jwtConfig = {
  secretAccessToken: process.env.SECRET_ACCESS_TOKEN || 'VC-Access-Team',
  secretRefreshToken: process.env.SECRET_REFRESH_TOKEN || 'VC-Refresh-Team',

  acessTokenExpiration: Number(ms('1 days') / 1000),
  refreshTokenExpiration: Number(ms('90 days') / 1000),
  emailValidateExpiration: Number(ms('15 minute') / 1000),
};
