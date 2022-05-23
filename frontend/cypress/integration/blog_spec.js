describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'https://localhost:3003/api/testing/reset');
    cy.request('POST', 'https://localhost:3003/api/users', {
      username: 'codemonkey',
      password: 'foobar',
      name: 'Test User',
    });
    cy.visit('https://localhost:3000');
    window.sessionStorage.removeItem('blogAppUser');
  });

  it('Login form is shown', function () {
    cy.contains('login');
    cy.contains('username');
    cy.contains('password');

    cy.get('html').should('not.contain', 'Logout');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.loginForm('codemonkey', 'foobar');
      cy.get('html').should('contain', 'login successful');
    });
    it('fails with incorrect credentials', function () {
      cy.loginForm('wrong', 'morewrong');
      cy.get('html').should('not.contain', 'login successful');
      cy.contains('invalid').should('have.css', 'color', 'rgb(95, 33, 32)');
    });
  });

  describe('While logged in', function () {
    beforeEach(function () {
      cy.loginBlind('codemonkey', 'foobar');
      cy.visit('https://localhost:3000/blogs');
    });
    it('should show logout button', function () {
      cy.get('html').should('contain', 'Logout');
    });

    it('user can add new blog', function () {
      cy.addBlog('blog by cypress', 'Sy Press', 'http://localhost.com');

      cy.get('html').should('contain', 'blog by cypress');
    });

    it('user can like a blog', function () {
      cy.addBlog('likable', 'Sy press', 'likes.com');
      cy.contains('likable').click();

      cy.get('[data-cy=likes]').should('contain', 'Likes: 0');

      cy.get('[data-cy=like-btn]').click();

      cy.get('[data-cy=likes]').should('contain', 'Likes: 1');
    });

    it('user can delete a blog', function () {
      cy.addBlog('likable', 'Sy press', 'likes.com');
      cy.contains('likable').click();

      cy.get('[data-cy=delete]').click();

      cy.get('html').should('not.contain', 'likable');
    });

    it('cannot delete a blog by another user', function () {
      // create blog to delete
      cy.addBlog('undeletable', 'Sy press', 'likes.com');
      cy.contains('Logout').click();

      // create 2nd user
      cy.request('POST', 'https://localhost:3003/api/users', {
        username: 'user2',
        password: 'foobar',
        name: 'Test User 2',
      });
      cy.loginBlind('user2', 'foobar');

      // open created blog
      cy.visit('https://localhost:3000/blogs');
      cy.contains('undeletable').click();

      // should not have delete button
      cy.get('[data-cy=delete]').should('not.exist');
    });

    // TODO: Optional 5.22* add testing to ensure blogs are sorted correctly by likes
  });
});
