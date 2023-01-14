import React from 'react'
import VrScansList from './VrScansList'

describe('<VrScansList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<VrScansList />)
  })
})