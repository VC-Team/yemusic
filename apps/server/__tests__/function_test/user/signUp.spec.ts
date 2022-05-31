import * as assert from 'assert';

import { user1, user2 } from '../../datasets/user/signUp';
import { request } from '../../helper.spec';

describe('Testing SignUp API', () => {
  test('[E-04] Email already exists', async () => {
    // Fake user exist in the database
    await request.post('/api/auth/signUp').send(user1);

    const response = await request.post('/api/auth/signUp').send(user1).expect(500);

    expect(response.body.errorCode).toEqual('E-04');
    expect(response.body.message).toEqual('Email already exists.');
  });

  test('Signup user successfully', done => {
    request
      .post('/api/auth/signUp')
      .send(user2)
      .expect(200)
      .then(response => {
        assert(response.body.data.me.email, user2.email);
        done();
      });
  });
});
