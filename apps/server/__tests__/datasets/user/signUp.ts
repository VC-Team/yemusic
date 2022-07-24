import { faker } from '@faker-js/faker';

export const draftUser = {
  email: faker.internet.email(),
  password: '12313dasd',
  displayName: faker.name.findName(),
};

export const userSignUp = {
  email: 'vcteam@gmail.com',
  password: '123456',
  displayName: faker.name.findName(),
};
