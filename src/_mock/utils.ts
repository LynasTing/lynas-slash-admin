import { faker } from '@faker-js/faker';

export const fakeAvatars = (count: number) => {
  const result: string[] = [];
  for (let index = 0; index < count; index++) {
    result.push(faker.image.avatar());
  }
  return result;
};
