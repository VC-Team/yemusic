import faker from '@faker-js/faker';

export const user1 = {
  account: faker.internet.email(),
  password: '123456',
};

export const userSignIn = {
  account: 'vcteam123@gmail.com',
  password: '123456',
};

export const userSignUp = {
  email: 'vcteam123@gmail.com',
  password: '123456',
  displayName: faker.name.findName(),
};
