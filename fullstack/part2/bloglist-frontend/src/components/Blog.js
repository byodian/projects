import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };

  const buttonLabel = visible ? 'hide' : 'view';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleUpdate = () => {
    const newBlog = {
      user: blog.user.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    };

    updateBlog(blog.id, newBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id);
    }
  };

  const blogStyle = {
    border: '1px solid #000',
    marginBottom: '10px',
    padding: '4px'
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
        <div style={showWhenVisible}>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p>likes {blog.likes} <button onClick={handleUpdate}>like</button></p>
          <p>Author {blog.author}</p>
          <button onClick={handleDelete}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
