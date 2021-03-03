const {
  listWithOneBlog,
  listWithManyBlog,
  mostLikes,
} = require('../utils/list_helper');

/* eslint-disable no-undef*/

describe('most likes', () => {
  test('of many blogs is calculated right', () => {
    expect(mostLikes(listWithManyBlog)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    });
  });

  test('of one value is the value itself', () => {
    expect(mostLikes(listWithOneBlog)).toEqual({
      author: 'Michael Chan',
      likes: 7
    });
  });

  test('of one value is the value itself', () => {
    expect(mostLikes([])).toEqual({});
  });
});