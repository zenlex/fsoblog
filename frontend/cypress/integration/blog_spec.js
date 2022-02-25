describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'https://localhost:3003/api/testing/reset')
    cy.request('POST', 'https://localhost:3003/api/users', {
      username: 'codemonkey', password: 'foobar', name: 'Test User'
    })
    cy.visit('https://localhost:3000')
    window.sessionStorage.removeItem('blogAppUser')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')

    cy.get('html').should('not.contain', 'Logout')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.loginForm('codemonkey', 'foobar')
      cy.get('html').should('contain', 'login successful')
    })
    it('fails with incorrect credentials', function () {
      cy.loginForm('wrong', 'morewrong')
      cy.get('html').should('not.contain', 'login successful')
      cy.contains('invalid').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('While logged in', function () {
    beforeEach(function () {
      cy.loginBlind('codemonkey', 'foobar')
    })
    it('should show logout button', function () {
      cy.get('html').should('not.contain', 'Logout')
    })

    it('user can add new blog', function () {
      cy.addBlog('blog by cypress', 'Sy Press', 'http://localhost.com')

      cy.get('html').should('contain', 'blog by cypress')
    })

    it('user can like a blog', function () {
      cy.addBlog('likable', 'Sy press', 'likes.com')
      cy.contains('likable').parent().parent().as('blogContainer')
      cy.get('@blogContainer')
        .contains('view')
        .click()

      cy.get('[data-cy=likes]')
        .should('contain', 'Likes: 0')

      cy.get('@blogContainer')
        .get('[data-cy=like-btn]')
        .click()

      cy.get('@blogContainer')
        .should('contain', 'Likes: 1')
    })

    it('user can delete a blog', function () {
      cy.addBlog('likable', 'Sy press', 'likes.com')
      cy.contains('likable').parent().parent().as('blogContainer')
      cy.get('@blogContainer')
        .contains('view')
        .click()

      cy.get('@blogContainer')
        .get('[data-cy=delete]')
        .click()

      cy.get('html').should('not.contain', 'likable')
    })
  })
})