import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  let mockHandler;
  beforeEach(() => {
    const blog = {
      title: 'You are the apple of my life',
      url: 'https://byodiandev.com',
      likes: 0,
      author: 'byodian',
      user: {
        id: 12
      }
    };

    mockHandler = jest.fn();
    component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    );
  });

  test('renders its children', () => {
    // component.debug();
    expect(component.container).toHaveTextContent('You are the apple of my life byodian');
  });

  test('at start the children are not displayed', () => {
    const detailedBlog = component.container.querySelector('.blog-detailed');
    expect(detailedBlog).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const detailedBlog = component.container.querySelector('.blog-detailed');
    expect(detailedBlog).not.toHaveStyle('display: none');
  });

  test('after clicking the button twice, the handler function is called twice', () => {
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
