import { redisConfig } from '@config';
import Redis from 'ioredis';

export const redis = new Redis(redisConfig);
