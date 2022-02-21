import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author only', async () => {
  const blog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    likes: 42,
    url: 'http://dontshowme.com'
  }

  render(<Blog blog={blog}
    updateBlog={() => console.log('updateBlog')}
    deleteBlog={() => console.log('deleteBlog')}
    currUser={{ name: 'testUser' }}
  />)

  const titleElement = screen.getByText('Title: TestBlog', { exact: false })
  const authorElement = screen.getByText('Author: TestAuthor', { exact: false })
  const url = await screen.queryByText('http://dontshowme.com')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(url).toBeNull()
})