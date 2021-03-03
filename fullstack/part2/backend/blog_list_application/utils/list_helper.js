// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1;
};

const listWithManyBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  }
];

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item;
  // Get all likes of blog lists
  const likes = blogs.map(blog => blog.likes);

  return likes.length === 0
    ? 0
    : likes.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes);
  const returnedBlog = blogs.filter(blog => blog.likes === Math.max(...likes));
  if (likes.length === 0) {
    return {};
  } else {
    const { title, author, likes } = returnedBlog[0];
    return {
      title,
      author,
      likes
    };
  }
};

const mostBlogs = blogs => {
  const authors = blogs.map(blog => blog.author);
  const uniqueAuthors = authors.filter((author, index) => authors.indexOf(author) === index);
  const newArray = uniqueAuthors.map(uniqueAuthor => ({
    author: uniqueAuthor,
    blogs: authors.filter(author => author === uniqueAuthor).length
  }));

  return blogs.length === 0
    ? {}
    : newArray.filter(a => a.blogs === Math.max(...newArray.map(a => a.blogs)))[0];
};

const mostLikes = blogs => {
  const reducer = (sum, blog) => sum + blog.likes;
  const uniqueAuthors = [...new Set(blogs.map(blog => blog.author))];
  const newData = uniqueAuthors.map(author => ({
    author: author,
    likes: blogs.filter(blog => blog.author === author).reduce(reducer, 0)
  }));

  return blogs.length === 0
    ? {}
    : newData.filter(a => a.likes === Math.max(...newData.map(a => a.likes)))[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  listWithManyBlog,
  listWithOneBlog,
  mostBlogs,
  mostLikes
};