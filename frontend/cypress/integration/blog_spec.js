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
      cy.get('#usernameinp').type('codemonkey')
      cy.get('#passwordinp').type('foobar')
      cy.contains('login').click()

      cy.get('html').should('contain', 'login successful')
    })
    it('fails with incorrect credentials', function () {
      cy.get('#usernameinp').type('wrong')
      cy.get('#passwordinp').type('morewrong')
      cy.contains('login').click()

      cy.get('html').should('not.contain', 'login successful')
      cy.contains('invalid').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('While logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'https://localhost:3003/api/login', {
        username: 'codemonkey', password: 'foobar'
      }).then(response => {
        console.log('response from api login', JSON.stringify(response.body), null, 2)
        window.sessionStorage.setItem('blogAppUser', JSON.stringify(response.body))
        cy.visit('https://localhost:3000')
      })
    })
    it('should show logout button', function () {
      cy.get('html').should('not.contain', 'Logout')
    })

    it('user can add new blog', function () {
      cy.contains('add blog').click()
      cy.get('[data-cy=title]').type('blog by cypress')
      cy.get('[data-cy=author]').type('Sy Press')
      cy.get('[data-cy=url]').type('http://localhost.com')

      cy.contains('create').click()

      cy.get('html').should('contain', 'blog by cypress')
    })

    it('user can like a blog', function () {
      cy.contains('add blog').click()
      cy.get('[data-cy=title]').type('likable')
      cy.get('[data-cy=author]').type('Sy Press')
      cy.get('[data-cy=url]').type('http://localhost.com')

      cy.contains('create').click()

      cy.contains('likable').parent().parent().as('blogContainer')
      cy.get('@blogContainer')
        .contains('view')
        .click()

      cy.get('[data-cy=likes]')
        .should('contain', 'Likes: 0')

      cy.get('@blogContainer')
        .contains('like')
        .click()

      cy.get('@blogContainer')
        .should('contain', 'Likes: 1')

    })
  })
})