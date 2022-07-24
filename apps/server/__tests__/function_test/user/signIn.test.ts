import { user } from '@utils/controllers';

import { user1, userSignIn, userSignUp } from '../../datasets/user/signIn';
import { request } from '../../helper.spec';

describe('Testing SignIn API', () => {
  test('[E-05] Email or Password is not correct', done => {
    request
      .post('/api/user/sign-in')
      .send(user1)
      .expect(500)
      .then(({ body }) => {
        expect(body.errorCode).toEqual('E-05');
        expect(body.message).toEqual('Email or Password is not correct, please try again!');
        done();
      })
      .catch(done);
  });

  test('SignIn user successfully', async () => {
    const newUser = await user.createUser(userSignUp);

    return request
      .post('/api/user/sign-in')
      .send(userSignIn)
      .expect(200)
      .then(({ body }) => {
        expect(body.data.me.email).toEqual(newUser.email);
      });
  });
});
