import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author only', () => {
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
  const url = screen.queryByText('http://dontshowme.com')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(url).toBeNull()
})


test('clicking details button shows likes and url', async () => {
  const blog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    likes: 42,
    url: 'http://dontshowme.com',
    user: { name: 'testUser', id: '12345' },
  }


  render(<Blog blog={blog}
    updateBlog={() => console.log('updateBlog')}
    deleteBlog={() => console.log('deleteBlog')}
    currUser={{ name: 'testUser', id: '12345' }}
  />)

  const button = screen.getByText('view');

  userEvent.click(button)

  const likes = screen.getByText('Likes:', { exact: false });
  const url = screen.getByText('URL', { exact: false })

  expect(likes).toBeDefined()
  expect(url).toBeDefined()
})

test('clicking like calls handler correct num of times', () => {
  const NUMCLICKS = 2
  const blog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    likes: 42,
    url: 'http://dontshowme.com',
    user: { name: 'testUser', id: '12345' },
  }

  const handleLike = jest.fn()

  render(<Blog blog={blog}
    updateBlog={() => handleLike()}
    deleteBlog={() => console.log('deleteBlog')}
    currUser={{ name: 'testUser', id: '12345' }}
  />)

  const detailsButton = screen.getByText('view')

  userEvent.click(detailsButton)

  const likeButton = screen.getByText('like')
  let clickCounter = NUMCLICKS
  while (clickCounter > 0) {
    userEvent.click(likeButton)
    clickCounter--
  }

  expect(handleLike.mock.calls).toHaveLength(NUMCLICKS)
})
