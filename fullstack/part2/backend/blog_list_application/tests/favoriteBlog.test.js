const {
  listWithManyBlog,
  listWithOneBlog,
  favoriteBlog
} = require('../utils/list_helper');

/* eslint-disable no-undef */
describe('max likes', () => {
  test('of empty array is {}', () => {
    expect(favoriteBlog([])).toEqual({});
  });

  test('of one value is the value itself', () => {
    expect(favoriteBlog(listWithOneBlog)).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    });
  });

  test('of many is calculated right', () => {
    expect(favoriteBlog(listWithManyBlog)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});