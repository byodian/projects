import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import BlogForm from './BlogForm';

test('aftering submit a new blog, the event handler function can be called', () => {
  const createBlog = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} />
  );

  const author = component.container.querySelector('#author');
  const title = component.container.querySelector('#title');
  const url = component.container.querySelector('#url');
  const button = component.getByText('create');
  // console.log(prettyDOM(author));
  // console.log(prettyDOM(title));
  // console.log(prettyDOM(url));
  // console.log(prettyDOM(button));

  fireEvent.change(author, {
    target: { value: 'superuser' }
  });

  fireEvent.change(title, {
    target: { value: 'You are the apple of my eyes' }
  });

  fireEvent.change(url, {
    target: { value: 'https://byodiandev.com' }
  });

  fireEvent.click(button);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'You are the apple of my eyes',
    author: 'superuser',
    url: 'https://byodiandev.com'
  });
});