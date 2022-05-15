import * as mongoose from 'mongoose';
import supertest = require('supertest');

import '../src/global';
import { mongoDB } from '../src/config';
import { createServer } from '../src/provider';

export const httpServer = supertest(createServer());

async function startMongoose() {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoDB.database_test);
    mongoose.connection
      .once('open', () => {
        resolve(true);
      })
      .on('error', error => {
        logger.warn('Warning', error);
        reject(error);
      });
  });
}

beforeAll(async () => {
  await startMongoose();
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();

  // Drop database
  await Promise.all(collections.map(collection => collection.drop()));

  // Disconnect
  await mongoose.disconnect();
});
