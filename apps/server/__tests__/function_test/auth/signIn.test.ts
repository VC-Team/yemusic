import { user1, user2, userToSignUp, userReal } from '../../datasets/user/signIn';
import request from '../../httpServer.spec';

const requestSignUp = request('signUp');
const requestSignIn = request('signIn');

describe('Testing SignIn API', () => {
  test('[E-05] Email is not correct', async () => {
    const { body } = await requestSignIn(user1);

    expect('E-05').toEqual(body.errorCode);
    expect('Email or Password is not correct, please try again!').toEqual(body.message);
  });

  test('[E-05] Password is not valid', async () => {
    const { body } = await requestSignIn(user2);

    expect('E-01').toEqual(body.errorCode);
  });

  test('[E-05] User is exist but Password is not correct', async () => {
    await requestSignUp(userReal);

    const { body } = await requestSignIn({
      email: userReal.email,
      password: userReal.password,
    });

    expect('E-05').toEqual(body.errorCode);
    expect('Email or Password is not correct, please try again!').toEqual(body.message);
  });

  test('SignIn user successfully', async () => {
    await requestSignUp(userToSignUp);

    const { body } = await requestSignIn(userReal);

    await expect(userReal.email).toEqual(body.data?.me?.email);
  });
});
