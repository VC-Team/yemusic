type Logger = {
  level: string;
};

type Headers = {
  'Access-Control-Allow-Origin': string;
  'x-youtube-client-name': number;
  'x-youtube-client-version': string;
  'User-Agent': string;
};

export type HttpServerConfig = {
  hostName: string;
  port: number;
  logger: Logger;
  headers: Headers;
};
