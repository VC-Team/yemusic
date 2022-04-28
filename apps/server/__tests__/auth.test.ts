import { User } from '@model/user';

import { httpServer } from './common.test';

type TRegister = {
  email: string;
  password: string;
};

describe('Auth', () => {
  const register: TRegister = {
    email: 'trungpham1998@gmail.com',
    password: '12312312',
  };

  beforeAll(async () => {
    await User.findOneAndDelete({ email: 'trungpham1998@gmail.com' });
  });

  describe('API SignUp', () => {
    const requestSignUp = async (params?: TRegister) => {
      return await httpServer.post('/api/auth/signUp').send(params || register);
    };

    describe('User Create Successfully', () => {
      test('Should return successfully created user', async () => {
        const {
          body: { data },
        } = await requestSignUp();

        expect(register.email).toEqual(data.email);
      });
    });

    describe('User Create Failure', () => {
      test('Should return errorCode E-01', async () => {
        const {
          body: { errorCode },
        } = await requestSignUp({ ...register, password: '' });

        expect('E-01').toEqual(errorCode);
      });

      test('Should return errorCode E-04', async () => {
        const {
          statusCode,
          body: { errorCode },
        } = await requestSignUp();

        expect(500).toEqual(statusCode);
        expect('E-04').toEqual(errorCode);
      });
    });
  });
});
