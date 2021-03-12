import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import Heading from './components/Heading';
import blogService from './services/blog';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationProps, setNotification] = useState({
    message: null,
    className: ''
  });
  const [user, setUser] = useState(null);

  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedBlogappUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
    if (loggedBlogappUser) {
      setUser(loggedBlogappUser);
      blogService.setToken(loggedBlogappUser.token);
    }
  }, []);

  const removeWarnMessage = () => {
    setTimeout(() => {
      setNotification({
        message: null,
        error: ''
      });
    }, 5000);
  };

  const addBlog = async (newBlog) => {
    try {
      blogRef.current.toggleVisibility();
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        className: 'pass'
      });
      removeWarnMessage();
    } catch (exception) {
      setNotification({
        message: 'request fails',
        className: 'error'
      });
      removeWarnMessage();
    }
  };

  const handleUpdate = async (id, newBlog) => {
    try {
      const updatedBlog = await blogService.update(id, newBlog);
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog));
      setNotification({
        message: `blog ${updatedBlog.title} by updated`,
        className: 'pass'
      });
      removeWarnMessage();
    } catch(exception) {
      setNotification({
        message: 'request fails',
        className: 'error'
      });
      removeWarnMessage();
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      setNotification({
        message: 'blog remove successfully',
        className: 'pass'
      });
    } catch(exception) {
      setNotification({
        message: 'request fails',
        className: 'error'
      });
      removeWarnMessage();
    }
  };

  const getLoginMessage = async (userObject) => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setNotification({
        message: 'wrong username or password',
        className: 'error'
      });
      removeWarnMessage();
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  return (
    <div>
      {user === null
        ? <Heading text='login in to application' />
        : <Heading text='blogs' />}
      <Notification notifiProps={notificationProps} />
      {user === null
        ? <LoginForm createLogin={getLoginMessage} />
        : <div>
          <p>{user.name} logged in <button onClick={handleLogout} type="submit">logout</button></p>
          <Togglable buttonLabel="create new note" ref={blogRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={handleUpdate}
                deleteBlog={handleDelete}
              />
            )}
          </div>
        </div>}
    </div>
  );
};

export default App;