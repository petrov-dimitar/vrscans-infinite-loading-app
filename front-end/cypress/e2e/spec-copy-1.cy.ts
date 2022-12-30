describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3030/lazy-loading-vrscans-library/')
    cy.get('[data-cy=navigateFavorites]').click()
    

    
  })
})