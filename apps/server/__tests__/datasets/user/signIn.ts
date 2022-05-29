import faker from '@faker-js/faker';

export const user1 = {
  email: faker.internet.email(),
  password: '123456',
};

export const user2 = {
  email: faker.internet.email(),
  password: '12313',
};

export const userToSignUp = {
  email: 'vcteam@gmail.com',
  password: '123456',
  displayName: faker.name.findName(),
};

export const userReal = {
  email: 'vcteam@gmail.com',
  password: '123456',
};
