import * as assert from 'assert';

import { user1 } from '../../datasets/user/signUp';
import { request } from '../../helper.spec';

describe('Testing SignUp API', () => {
  test('Signup user successfully', done => {
    request
      .post('/api/auth/signUp')
      .send(user1)
      .expect(200)
      .then(response => {
        assert(response.body.data.me.email, user1.email);
        done();
      });
  });

  test('[E-04] Email already exists', done => {
    request
      .post('/api/auth/signUp')
      .send(user1)
      .expect(500)
      .then(response => {
        assert(response.body.errorCode, 'E-04');
        assert(response.body.message, 'Email already exists.');
        done();
      });
  });
});
