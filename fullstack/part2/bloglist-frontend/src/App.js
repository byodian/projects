import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/CreateBlogForm';
import Heading from './components/Heading';
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationProps, setNotificationProps] = useState({
    message: null,
    className: ''
  });
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const loggedBlogappUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'));
    if (loggedBlogappUser) {
      setUser(loggedBlogappUser);
      blogService.setToken(loggedBlogappUser.token);
    }
  }, [])

  const removeWarnMessage = () => {
    setTimeout(() => {
      setNotificationProps({
        message: null,
        error: ''
      });
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationProps({
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

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));
      setNotificationProps({
        message: `a new blog ${title} by ${author} added`,
        className: 'pass'
      })

      setTitle('');
      setAuthor('');
      setUrl('');
      removeWarnMessage();
    } catch (exception) {
      setNotificationProps({
        message: 'request fails',
        className: 'error'
      });
      removeWarnMessage();
    }
  }

  const loginConfig = {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin
  };
  

  const creatBlogConfig = {
    title,
    author,
    url,
    setTitle,
    setAuthor,
    setUrl,
    addBlog
  };

  return (
    <div>
      {user === null
        ? <Heading text='login in to application' />
        : <Heading text='blogs' />}
      <Notification notifiProps={notificationProps} />
      {user === null
        ? <LoginForm loginFormConfig={loginConfig} />
        : <div>
            <p>{user.name} logged in <button onClick={handleLogout} type="submit">logout</button></p>
            <BlogForm blogFormConfig={creatBlogConfig} />
            <ul>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </ul>
          </div>}
    </div>
  );
};

export default App