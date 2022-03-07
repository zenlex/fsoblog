import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';

test.skip('clicking submit calls handler with correct details', () => {
  //todo: figure out how to do this kind of test with the redux context
  const testBlog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestURL',
  };

  const mockAddBlog = jest.fn();

  render(<BlogForm />);

  const titleInput = screen.getByPlaceholderText('enter title');
  const authorInput = screen.getByPlaceholderText('enter author');
  const urlInput = screen.getByPlaceholderText('enter url');
  const submitBtn = screen.getByRole('button', { name: 'create' });

  userEvent.type(titleInput, testBlog.title);
  userEvent.type(authorInput, testBlog.author);
  userEvent.type(urlInput, testBlog.url);

  userEvent.click(submitBtn);

  expect(mockAddBlog.mock.calls).toHaveLength(1);
  expect(mockAddBlog.mock.calls[0][0]).toEqual(testBlog.title);
  expect(mockAddBlog.mock.calls[0][1]).toEqual(testBlog.author);
  expect(mockAddBlog.mock.calls[0][2]).toEqual(testBlog.url);
});
