import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserRoleProvider } from '../../app/javascript/hooks/UserRoleContext'
import SearchPage from '../../app/javascript/components/SearchPage'

describe('Search Page with Card Component', () => {
  const mockNutris = [
    {
      id: '1',
      name: 'Dr. Smith',
      services: [
        {
          id: 's1',
          name: 'Weight Loss Consultation',
          price: 100,
          location: 'New York'
        },
        {
          id: 's2',
          name: 'Diet Planning',
          price: 150,
          location: 'Online'
        }
      ]
    }
  ]

  // Mock the SchedulerModal component using Cypress
  beforeEach(() => {
    cy.intercept('GET', '/nutritionists', {
      statusCode: 200,
      body: mockNutris
    }).as('getNutritionists')

    cy.intercept('POST', '/nutritionists/search', {
      statusCode: 200,
      body: mockNutris
    }).as('searchNutritionists')

    // Mock the SchedulerModal component
    cy.stub(React, 'createElement').callsFake((component, props) => {
      if (component.name === 'SchedulerModal') {
        return (
          <div data-testid="scheduler-modal" style={{ display: props.isOpen ? 'block' : 'none' }}>
            <h2>Schedule Appointment with {props.nutri.name}</h2>
            <button onClick={props.onClose} aria-label="Close">
              Close Modal
            </button>
          </div>
        )
      }
      return React.createElement.apply(this, arguments)
    })

    cy.mount(
      <UserRoleProvider value={{ role: 'patient' }}>
        <Router>
          <SearchPage />
        </Router>
      </UserRoleProvider>
    )

    cy.wait('@getNutritionists')
  })

  afterEach(() => {
    // Restore the original createElement
    React.createElement.restore()
  })

  it('displays nutritionist information correctly', () => {
    cy.contains('h2', 'Dr. Smith').should('be.visible')
    cy.contains('Weight Loss Consultation').should('be.visible')
    cy.contains('New York').should('be.visible')
    cy.contains('100 €').should('be.visible')
  })

  // ... rest of your test cases remain the same ...
  it('opens scheduler modal when schedule button is clicked', () => {
    cy.get('button').contains('Schedule appointment').click()
    cy.get('[data-testid="scheduler-modal"]').should('be.visible')
    cy.contains('Schedule Appointment with Dr. Smith').should('be.visible')
  })

  it('closes modal when close button is clicked', () => {
    cy.get('button').contains('Schedule appointment').click()
    cy.get('[data-testid="scheduler-modal"]').should('be.visible')
    cy.contains('Close Modal').click()
    cy.get('[data-testid="scheduler-modal"]').should('not.be.visible')
  })

  // ... other tests ...
})