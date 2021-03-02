require('dotenv').config();
const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const mongoUrl = process.env.MONGODB_URL;

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => {
    console.log('connected mongoDB');
  })
  .catch(error => {
    console.log(error.message);
  });

// const blog = new Blog({
//   title: 'JavaScript is so hard',
//   author: 'byodian',
//   url: 'byodiandev.com',
//   likes: 4
// });

// blog.save().then(() => {
//   console.log('blog list saved');
//   mongoose.connection.close();
// });

Blog.find({}).then(blogs => {
  console.log(blogs);
  mongoose.connection.close();
});