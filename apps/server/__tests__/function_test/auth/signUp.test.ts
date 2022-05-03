import { user1, user2 } from '../../datasets/user/signUp';
import request from '../../httpServer';

const requestSignUp = request('signUp');

describe('Testing SignUp API', () => {
  test('[E-04] Email already exists', async () => {
    await requestSignUp(user1);
    const { body } = await requestSignUp(user1);

    expect('E-04').toEqual(body.errorCode);
    expect('Email already exists.').toEqual(body.message);
  });
  test('Create user successfully', async () => {
    const { body } = await requestSignUp(user2);

    expect(body.data);
    expect(user2.email).toEqual(body.data.email);
  });
});
