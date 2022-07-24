import { mixed, string } from 'vcc-schema';

import { TRouterConfig } from './type.config';

export const routerConfig: Record<string, TRouterConfig> = {
  '/user/sign-up': {
    validateSchema: mixed({
      email: string().email(),
      password: string().min(6),
      displayName: string().min(1),
    }),
    private: false,
  },
  '/user/send-email-verify': {
    validateSchema: mixed({
      email: string().email(),
    }),
    private: false,
  },
  '/user/sign-in': {
    validateSchema: mixed({
      account: string(),
      password: string().min(6),
    }),
    private: false,
  },
  '/user/refresh-token': {
    validateSchema: mixed({
      account: string(),
      password: string().min(6),
    }),
    private: true,
  },
} as const;
