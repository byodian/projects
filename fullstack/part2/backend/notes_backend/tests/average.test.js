const { average } = require('../utils/for_testing');

/* eslint-disable no-undef*/
describe('test', () => {
  test('of the empty array is zero', () => {
    expect(average([])).toBe(0);
  });

  test('of the one number value is the number itself', () => {
    expect(average([1])).toBe(1);
  });

  test('of many numbers is calculated right', () => {
    expect(average([1,2,3,4,5,6])).toBe(3.5);
  });
});