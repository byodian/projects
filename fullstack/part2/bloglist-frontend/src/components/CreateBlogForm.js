import React from 'react';
import Heading from './Heading';
import Input from './Input';

const BlogForm = ({ blogFormConfig }) => {
  const { title, author, url, setTitle, setAuthor, setUrl, addBlog } = blogFormConfig;
  return (
    <div>
      <Heading text="create a new blog" />
      <form onSubmit={addBlog}>
        <div>
          title:
          <Input 
            required={true} 
            type="text"
            value={title}
            name="Title"
            handleChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <Input 
            required={true} 
            type="text"
            value={author}
            name="Author"
            handleChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <Input 
            required={true} 
            type="text"
            value={url}
            name="Url"
            handleChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
