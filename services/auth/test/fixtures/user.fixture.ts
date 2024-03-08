import { User } from '../../src/schemas/user.schema';

export const userMock: User = {
  name: 'test',
  email: 'test@test.com',
  password: 'qwert12345',
};

export const userMockLoginTest: User = {
  name: 'testLogin',
  email: 'testLogin@test.com',
  password: 'qwert12345',
};
