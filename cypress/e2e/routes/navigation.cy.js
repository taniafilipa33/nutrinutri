describe('App Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to Search page', () => {
    cy.contains('button', 'I am a Patient').click();
    cy.url().should('include', '/search');
    cy.get('button').should('contain', 'Search');
  });

  it('should navigate to Requests page', () => {
    cy.contains('button', 'I am a Nutritionist').click();
    cy.url().should('include', '/requests');
  
    cy.get('span.text-xl').should('contain', 'Pending Requests');
  });

  it('should navigate to Requests page', () => {
    cy.contains('a', 'nutrinutri').click();
    cy.url().should('include', '/');
  
    cy.get('h1').should('contain', 'Welcome to nutrinutri');
  });


  it('should show home page by default', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});