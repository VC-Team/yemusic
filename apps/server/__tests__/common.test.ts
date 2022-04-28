import { connect, connection, disconnect } from 'mongoose';
import supertest = require('supertest');

import { mongoDB } from '../src/config';
import { createServer } from '../src/provider';

let status = 0;
export const httpServer = supertest(createServer());

beforeAll(async () => {
  await connect(mongoDB.database_test);
  status = ((await connection.asPromise()) || {}).readyState;

  if (status === 1) {
    // === Drop All Database ===
    const collections = await connection.db.collections();
    for (const collection of collections) {
      await collection.drop();
    }
  }
});

afterAll(done => {
  return disconnect(done);
});

test('should Connected', async () => {
  expect(status).toBe(1);
});
