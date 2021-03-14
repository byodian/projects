describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    // create a user to backend
    cy.createUser({
      username: 'root',
      name: 'superuser',
      password: 'selerina'
    });
  });

  it('Login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('selerina');
      cy.get('#login-button').click();

      cy.get('html').contains('superuser logged in');
    });

    it('fails with wrong credentails', function () {
      cy.get('#username').type('root');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'superuser logged in');
    });
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'root',
        password: 'selerina'
      });
    });

    it('A blog can be created', function() {
      const str = 'cypress creates a blog';
      cy.contains('create new note').click();

      cy.get('#title').type(str);
      cy.get('#author').type('superuser');
      cy.get('#url').type('http://byodiandev.com');

      cy.get('#create-button').click();
      cy.contains(str);
    });

    it('likes can be clicked', function() {
      cy.createBlog({
        title: 'another blog by cypress',
        author: 'superuser',
        url: 'http://byodiandev.com'
      });
      cy.contains('view').click();
      cy.get('#like-button').click();
      cy.contains('likes 1');
    });

    it.only('most popular blog should be the top of list', function() {
      cy.createBlog({
        title: 'create a blog by cypress',
        author: 'superuser',
        url: 'http://byodiandev.com'
      });

      cy.createBlog({
        title: 'create another blog by cypress',
        author: 'superuser',
        url: 'http://byodiandev.com'
      });

      cy.get('.blog-title').first().should('contain', 'create a blog by cypress');
    });

    describe('When delete blog', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'You are the apple of my eyes',
          url: 'http://byodiandev.com',
          author: 'superuser'
        });
      });

      it('user created blogs can delete blog', function() {
        cy.contains('view').click();
        cy.get('#delete-button').click();
        cy.get('html').should('not.contain', 'You are the apple of my eyes');
      });

      it('other user can not delete blog', function() {
        cy.contains('logout').click();
        cy.createUser({
          username: 'byodian',
          name: 'byj',
          password: 'selerina'
        });
        cy.login({
          username: 'byodian',
          password: 'selerina'
        });

        cy.contains('view').click();
        cy.get('#delete-button').click();
        cy.get('.error').should('contain', 'Authorizated fails')
          .and('have.css', 'color', 'rgb(255, 0, 0)');
      });
    });
  });
});