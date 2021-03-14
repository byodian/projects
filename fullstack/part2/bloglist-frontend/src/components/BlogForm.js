import React, { useState } from 'react';
import Heading from './Heading';
import Input from './Input';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url
    });
    setTitle('');
    setUrl('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <Heading text="create a new blog" />
      <form onSubmit={addBlog}>
        <div className="input-container">
          <label htmlFor="title">title</label>
          <Input
            id="title"
            required={true}
            type="text"
            value={title}
            name="Title"
            handleChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="author">author</label>
          <Input
            id="author"
            required={true}
            type="text"
            value={author}
            name="Author"
            handleChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="url">url</label>
          <Input
            id="url"
            required={true}
            type="text"
            value={url}
            name="Url"
            handleChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button id="create-button" type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
