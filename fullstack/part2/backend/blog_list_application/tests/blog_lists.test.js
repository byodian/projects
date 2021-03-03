const {
  listWithManyBlog,
  listWithOneBlog,
  totalLikes,
  dummy
} = require('../utils/list_helper');

/* eslint-disable no-undef */
describe('test', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  test.only('when list has only one blog, equals the likes of that', () => {
    expect(totalLikes(listWithOneBlog)).toBe(7);
  });

  test('of a bigger list is calculated right', () => {
    expect(totalLikes(listWithManyBlog)).toBe(36);
  });
});