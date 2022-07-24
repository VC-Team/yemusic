import { TSignUpInput } from '@interface/index';
import { User } from '@model/index';

import { auth } from '.';

export async function createUser(params) {
  const { email, password, displayName }: TSignUpInput = params;

  const hashPassword = auth.generateHash(password, 10);

  const newUser = await User.create({
    email,
    'info.displayName': displayName,
    password: hashPassword,
  });

  const user = newUser.toObject();
  delete user.password;

  return user;
}
