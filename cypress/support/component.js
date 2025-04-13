import { mount } from 'cypress/react'
import { checkPendingRequests, requestAppointment } from '../../app/javascript/services/requests'

Cypress.Commands.add('mount', mount)

// Make sure these are available on window for stubbing
before(() => {
  window.checkPendingRequests = checkPendingRequests
  window.requestAppointment = requestAppointment
  window.alert = window.alert || (() => {}) // Ensure alert exists
})