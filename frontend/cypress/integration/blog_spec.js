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
      cy.contains('invalid').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('While logged in', function () {
    beforeEach(function () {
      cy.loginBlind('codemonkey', 'foobar');
<<<<<<< HEAD
      cy.visit('https://localhost:3000/blogs');
    });
    it('should show logout button', function () {
      cy.get('html').should('contain', 'Logout');
=======
    });
    it('should show logout button', function () {
      cy.get('html').should('not.contain', 'Logout');
>>>>>>> 82d5acb4ab1c0e9895f1af66060199f4087a8c83
    });

    it('user can add new blog', function () {
      cy.addBlog('blog by cypress', 'Sy Press', 'http://localhost.com');

      cy.get('html').should('contain', 'blog by cypress');
    });

    it('user can like a blog', function () {
      cy.addBlog('likable', 'Sy press', 'likes.com');
<<<<<<< HEAD
      cy.contains('likable').click();

      cy.get('[data-cy=likes]').should('contain', 'Likes: 0');

      cy.get('[data-cy=like-btn]').click();

      cy.get('[data-cy=likes]').should('contain', 'Likes: 1');
=======
      cy.contains('likable').parent().parent().as('blogContainer');
      cy.get('@blogContainer').contains('view').click();

      cy.get('[data-cy=likes]').should('contain', 'Likes: 0');

      cy.get('@blogContainer').get('[data-cy=like-btn]').click();

      cy.get('@blogContainer').should('contain', 'Likes: 1');
>>>>>>> 82d5acb4ab1c0e9895f1af66060199f4087a8c83
    });

    it('user can delete a blog', function () {
      cy.addBlog('likable', 'Sy press', 'likes.com');
<<<<<<< HEAD
      cy.contains('likable').click();

      cy.get('[data-cy=delete]').click();
=======
      cy.contains('likable').parent().parent().as('blogContainer');
      cy.get('@blogContainer').contains('view').click();

      cy.get('@blogContainer').get('[data-cy=delete]').click();
>>>>>>> 82d5acb4ab1c0e9895f1af66060199f4087a8c83

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
<<<<<<< HEAD
      cy.visit('https://localhost:3000/blogs');
      cy.contains('undeletable').click();

      // should not have delete button
      cy.get('[data-cy=delete]').should('not.exist');
=======
      cy.contains('undeletable').parent().parent().as('blogContainer');
      cy.get('@blogContainer').contains('view').click();

      // should not have delete button
      cy.get('@blogContainer').get('[data-cy=delete]').should('not.exist');
>>>>>>> 82d5acb4ab1c0e9895f1af66060199f4087a8c83
    });

    // TODO: Optional 5.22* add testing to ensure blogs are sorted correctly by likes
  });
});
