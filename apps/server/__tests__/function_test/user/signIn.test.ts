import * as assert from 'assert';

import { user1, userSignUp, userSignIn } from '../../datasets/user/signIn';
import { request } from '../../helper.spec';

describe('Testing SignIn API', () => {
  test('[E-05] Email is not correct', done => {
    request
      .post('/api/user/signIn')
      .send(user1)
      .expect(500)
      .then(({ body }) => {
        assert(body.errorCode, 'E-05');
        assert(body.message, 'Email or Password is not correct, please try again!');
        done();
      });
  });

  test('SignIn user successfully', async () => {
    await request.post('/api/user/signUp').send(userSignUp);

    const { body } = await request.post('/api/user/signIn').send(userSignIn);

    await expect(body.data?.me?.email).toEqual(userSignIn.account);
  });
});
