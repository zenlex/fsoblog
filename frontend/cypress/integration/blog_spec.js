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

    cy.get('html').should('not.contain', 'logged in')
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
})