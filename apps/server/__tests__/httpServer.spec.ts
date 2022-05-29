import { httpServer } from './helper.spec';

const originalUrlMap = {
  songDetail: {
    url: '/api/song',
    method: 'get',
  },
  signUp: {
    url: '/api/user/signUp',
    method: 'post',
  },
  signIn: {
    url: '/api/user/signIn',
    method: 'post',
  },
};

export default (route: string) => {
  const original = originalUrlMap[route];
  if (!original) return;

  const { url, method } = original;
  console.log(url);

  return async function params(params = {}) {
    return method === 'get'
      ? httpServer.get(`${url}/${Object.values(params).join('/')}`)
      : httpServer[method](url).send(params);
  };
};
