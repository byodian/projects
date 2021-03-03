const {
  listWithOneBlog,
  listWithManyBlog,
  mostBlogs,
} = require('../utils/list_helper');

/* eslint-disable no-undef*/

describe('most blogs', () => {
  test('of many blogs is calculated right', () => {
    expect(mostBlogs(listWithManyBlog)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    });
  });

  test('of one value is the value itself', () => {
    expect(mostBlogs(listWithOneBlog)).toEqual({
      author: 'Michael Chan',
      blogs: 1
    });
  });

  test('of one value is the value itself', () => {
    expect(mostBlogs([])).toEqual({});
  });
});