describe('empty spec', () => {
  it('passes', () => {
    cy.visit(`${Cypress.env('REACT_APP_BASE_URL')}/lazy-loading-vrscans-library/explore`);
    cy.contains('Login').parent('div').click();
    cy.get('[data-cy=switchLoginButton]').click();
    cy.get('[data-cy=emailField]').type('dimitar13@email.com');
    cy.get('[data-cy=passwordField]').type('123456');
    cy.get('input[type="submit"]').contains('Login').click();
    cy.contains('logout').should('be.visible');
  });
});
