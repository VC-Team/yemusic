import { user } from '@utils/controllers';

import { draftUser, userSignUp } from '../../datasets/user/signUp';
import { request } from '../../helper.spec';

describe('Testing SignUp API', () => {
  test('[E-04] Email already exists', async () => {
    await user.createUser(draftUser);

    return request
      .post('/api/user/sign-up')
      .send(draftUser)
      .expect(500)
      .then(response => {
        expect(response.body.errorCode).toEqual('E-04');
        expect(response.body.message).toEqual('Email already exists.');
      });
  });

  test('Signup user successfully', done => {
    request
      .post('/api/user/sign-up')
      .send(userSignUp)
      .expect(200)
      .then(response => {
        expect(response.body.data.me.email).toEqual(userSignUp.email);
        done();
      });
  });
});
