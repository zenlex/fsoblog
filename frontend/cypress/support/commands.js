// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('addBlog', (title, author, url) => {
  cy.contains('add blog').click();
  cy.get('[data-cy=title]').type(title);
  cy.get('[data-cy=author]').type(author);
  cy.get('[data-cy=url]').type(url);

  cy.contains('create').click();
});

Cypress.Commands.add('loginForm', (username, password) => {
  cy.get('#usernameinp').type(username);
  cy.get('#passwordinp').type(password);
  cy.contains('login').click();
});

Cypress.Commands.add('loginBlind', (username, password) => {
  cy.request('POST', 'https://localhost:3003/api/login', {
    username,
    password,
  }).then((response) => {
    console.log(
      'response from api login',
      JSON.stringify(response.body),
      null,
      2
    );
    window.sessionStorage.setItem('blogAppUser', JSON.stringify(response.body));
    cy.visit('https://localhost:3000');
  });
});
