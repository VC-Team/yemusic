import faker from '@faker-js/faker';

export const user1 = {
  email: faker.internet.email(),
  password: '123456',
};

export const user2 = {
  email: faker.internet.email(),
  password: '12313',
};

export const userSignUp = {
  email: 'vcteam@gmail.com',
  password: '123456',
  displayName: faker.name.findName(),
};

export const userSignIn = {
  account: userSignUp.email,
  password: userSignUp.password,
};
