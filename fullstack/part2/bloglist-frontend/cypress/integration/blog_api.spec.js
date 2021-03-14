describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    // create a user to backend
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root',
      name: 'superuser',
      password: 'selerina'
    });
    cy.visit('http://localhost:3000');
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
      cy.get('#username').type('root');
      cy.get('#password').type('selerina');
      cy.get('#login-button').click();
    });

    it.only('A blog can be created', function() {
      const str = 'cypress creates a blog';
      cy.contains('create new note').click();

      cy.get('#title').type(str);
      cy.get('#author').type('superuser');
      cy.get('#url').type('http://byodiandev.com');

      cy.get('#create-button').click();
      cy.contains(str);
    });
  });
});