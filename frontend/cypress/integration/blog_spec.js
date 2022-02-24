describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'https://localhost:3003/api/testing/reset')
    cy.visit('https://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')

    cy.get('html').should('not.contain', 'logged in')
  })
})