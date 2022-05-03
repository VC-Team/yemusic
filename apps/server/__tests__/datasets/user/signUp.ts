import { faker } from '@faker-js/faker';

export const user1 = {
  email: faker.internet.email(),
  password: '12313dasd',
  displayName: faker.name.findName(),
};

export const user2 = {
  email: faker.internet.email(),
  password: '12313dasd',
  displayName: faker.name.findName(),
};
