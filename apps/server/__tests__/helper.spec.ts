import { mongoDB } from '@config/index';
import * as mongoose from 'mongoose';
import supertest = require('supertest');

import '../src/global';

import { createServer } from '../src/provider';

export const request = supertest(createServer());

async function startMongoose() {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoDB.database_test, mongoDB.mongoOptions);
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
  // Connect
  await startMongoose();
});

afterAll(async () => {
  const collections = await mongoose.connection.db?.collections();

  // Drop database
  for (let index = 0; index < collections.length; index++) {
    const collection = collections[index];
    try {
      await mongoose.connection.db.dropCollection(collection.collectionName);
    } catch (error) {
      if (error.code === 26) {
        // name space not found shouldn't drop collection
      } else {
        throw error;
      }
    }
  }

  // Disconnect
  await mongoose.disconnect();
});
