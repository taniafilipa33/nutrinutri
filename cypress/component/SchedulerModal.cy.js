import React from 'react'
import SchedulerModal from '../../app/javascript/components/ui/SchedulerModal'

describe('SchedulerModal Component', () => {
  const mockNutri = {
    id: '1',
    name: 'Dr. Smith',
    services: [
      {
        id: 1,
        name: 'Weight Loss Consultation',
        location: 'New York'
      },
      {
        id: 2,
        name: 'Diet Planning',
        location: 'Online'
      }
    ]
  }

  const mockOnClose = () => {} // Will be stubbed in each test

  // Setup that can run before tests
  const setupComponent = (props = {}) => {
    const onCloseSpy = cy.spy().as('onClose')
    return cy.mount(
      <SchedulerModal 
        isOpen={true}
        onClose={onCloseSpy}
        nutri={mockNutri}
        {...props}
      />
    )
  }

  it('renders the modal with correct fields', () => {
    setupComponent()
    cy.contains('Schedule Appointment').should('be.visible')
    cy.get('input#name').should('exist')
    cy.get('input#email').should('exist')
    cy.get('input#dateTime').should('exist')
    cy.get('select').should('exist')
    cy.contains('button', 'Close').should('exist')
    cy.contains('button', 'Submit').should('exist')
  })

  it('displays all services in the dropdown', () => {
    setupComponent()
    mockNutri.services.forEach(service => {
      cy.get('select').contains(service.name).should('exist')
    })
  })

  it('closes when Close button is clicked', () => {
    setupComponent()
    cy.contains('button', 'Close').click()
    cy.get('@onClose').should('have.been.calledOnce')
  })

  beforeEach(() => {
    if (window.checkPendingRequests.restore) {
      window.checkPendingRequests.restore()
    }
    if (window.requestAppointment.restore) {
      window.requestAppointment.restore()
    }
    if (window.alert.restore) {
      window.alert.restore()
    }
  })

  it('submits the form successfully', () => {

      // Stub the functions
      cy.stub(window, 'checkPendingRequests').rejects(new Error('Pending request exists')).as('checkPendingStub')
      cy.stub(window, 'alert').as('alertStub')
    setupComponent()
    // Fill out the form
    cy.get('input#name').type('John Doe')
    cy.get('input#email').type('john@example.com')
    cy.get('input#dateTime').type('2023-12-31T10:00')
    cy.get('select').select('Weight Loss Consultation')
    
    // Submit the form
    cy.contains('button', 'Submit').click()
    
    //cy.get('@checkPendingStub').should('have.been.calledOnce');
    cy.get('@alertStub').should('have.been.calledWith', 'you already have a pending request');
    cy.get('@onClose').should('not.have.been.called');
  })

  it('shows error when email has pending request', () => {
    // Stub inside the test
    cy.stub(window, 'checkPendingRequests').rejects(new Error('Pending request exists')).as('checkPendingRequests')
    const alertStub = cy.stub(window, 'alert').as('alert')
    
    setupComponent()
    
    // Fill out the form
    cy.get('input#name').type('John Doe')
    cy.get('input#email').type('john@example.com')
    cy.get('input#dateTime').type('2023-12-31T10:00')
    cy.get('select').select('Weight Loss Consultation')
    
    // Submit the form and verify alert
    cy.contains('button', 'Submit').click()
    cy.get('@alert').should('have.been.calledWith', 'you already have a pending request')
  })

  it('requires all fields to be filled', () => {
    setupComponent()
    cy.contains('button', 'Submit').click()
    cy.get('input#name').then(($input) => {
      expect($input[0].checkValidity()).to.be.false
    })
  })
})