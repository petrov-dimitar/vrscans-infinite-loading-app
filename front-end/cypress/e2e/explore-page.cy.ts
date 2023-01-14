describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3030/lazy-loading-vrscans-library/explore');
    cy.get('[data-cy=explorepageContainer]');
    cy.get('[data-cy=materialFilters]').contains('Wood').find('input').click();
    cy.get('[data-cy=tagFilters]').contains('Glossy').find('input').click();
    cy.scrollTo(0, 0);
    cy.wait(5000);
    cy.get('[data-cy=searchFilter]').type('oak');
  });
});
