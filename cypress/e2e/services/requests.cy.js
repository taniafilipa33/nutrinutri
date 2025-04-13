describe('API Requests', () => {
    const BASE_URL = 'http://localhost:3000';
    const mockNutritionists = [
      { id: 1, name: 'Dr. Smith', specialty: 'Weight Loss' },
      { id: 2, name: 'Dr. Johnson', specialty: 'Pediatrics' }
    ];
  
    const mockAppointments = [
      { id: '1', patientName: 'John Doe', date: '2023-07-15' },
      { id: '2', patientName: 'Jane Smith', date: '2023-07-16' }
    ];
  
    beforeEach(() => {
      cy.intercept('GET', `${BASE_URL}/nutritionists`, {
        statusCode: 200,
        body: mockNutritionists
      }).as('getNutritionists');
  
      cy.intercept('GET', `${BASE_URL}/nutritionists/search*`, {
        statusCode: 200,
        body: [mockNutritionists[0]]
      }).as('searchNutritionists');
  
      cy.intercept('GET', `${BASE_URL}/appointments/search*`, {
        statusCode: 200,
        body: mockAppointments
      }).as('getPendingRequests');
  
      cy.intercept('POST', `${BASE_URL}/appointments`, {
        statusCode: 201,
        body: { id: '3', status: 'pending' }
      }).as('requestAppointment');
  
      cy.intercept('PATCH', `${BASE_URL}/appointments/*`, {
        statusCode: 200,
        body: { id: '1', status: 'confirmed' }
      }).as('answerAppointment');
  
      cy.intercept('GET', `${BASE_URL}/appointments/checkPending*`, {
        statusCode: 200,
        body: { hasPending: true }
      }).as('checkPendingRequests');
    });
  
    describe('fetchNutritionists', () => {
      it('should fetch nutritionists successfully', () => {
        cy.window().then(async (win) => {
          const result = await win.fetchNutritionists();
          expect(result).to.deep.equal(mockNutritionists);
        });
      });
  
      it('should handle errors', () => {
        cy.intercept('GET', `${BASE_URL}/nutritionists`, {
          statusCode: 500,
          body: { error: 'Server error' }
        }).as('getNutritionistsError');
  
        cy.window().then(async (win) => {
          try {
            await win.fetchNutritionists();
          } catch (error) {
            expect(error.response.status).to.equal(500);
          }
        });
      });
    });
  
    describe('searchNutritionists', () => {
      it('should search with query and location', () => {
        cy.window().then(async (win) => {
          const result = await win.searchNutritionists('Smith', 'New York');
          expect(result).to.deep.equal([mockNutritionists[0]]);
        });
      });
  
      it('should handle empty results', () => {
        cy.intercept('GET', `${BASE_URL}/nutritionists/search*`, {
          statusCode: 200,
          body: []
        });
  
        cy.window().then(async (win) => {
          const result = await win.searchNutritionists('Unknown', 'Nowhere');
          expect(result).to.deep.equal([]);
        });
      });
    });
  
    describe('getPendingRequests', () => {
      it('should fetch pending requests', () => {
        cy.window().then(async (win) => {
          const result = await win.getPendingRequests();
          expect(result).to.deep.equal(mockAppointments);
        });
      });
  
      it('should include status=pending in params', () => {
        cy.window().then(async (win) => {
          await win.getPendingRequests();
          cy.wait('@getPendingRequests').then((interception) => {
            expect(interception.request.url).to.include('status=pending');
          });
        });
      });
    });
  
    describe('requestAppointment', () => {
      const appointmentData = {
        name: 'New Patient',
        email: 'new@example.com',
        requested_date: '2023-07-20',
        service_id: '123'
      };
  
      it('should create new appointment', () => {
        cy.window().then(async (win) => {
          const result = await win.requestAppointment(
            appointmentData.name,
            appointmentData.email,
            appointmentData.requested_date,
            appointmentData.service_id
          );
          expect(result.id).to.exist;
          expect(result.status).to.equal('pending');
        });
      });
  
      it('should send correct request body', () => {
        cy.window().then(async (win) => {
          await win.requestAppointment(
            appointmentData.name,
            appointmentData.email,
            appointmentData.requested_date,
            appointmentData.service_id
          );
          
          cy.wait('@requestAppointment').then((interception) => {
            expect(interception.request.body).to.deep.equal(appointmentData);
          });
        });
      });
    });
  
    describe('answerAppointment', () => {
      it('should update appointment status', () => {
        cy.window().then(async (win) => {
          const result = await win.answerAppointment('1', 'confirmed');
          expect(result.status).to.equal('confirmed');
        });
      });
  
      it('should send correct PATCH data', () => {
        cy.window().then(async (win) => {
          await win.answerAppointment('1', 'rejected');
          
          cy.wait('@answerAppointment').then((interception) => {
            expect(interception.request.body).to.deep.equal({
              appointments: { status: 'rejected' }
            });
          });
        });
      });
    });
  
    describe('checkPendingRequests', () => {
      it('should check pending requests by email', () => {
        const testEmail = 'test@example.com';
        
        cy.window().then(async (win) => {
          const response = await win.checkPendingRequests(testEmail);
          expect(response.data.hasPending).to.be.true;
        });
      });
  
      it('should include email in query params', () => {
        const testEmail = 'test@example.com';
        
        cy.window().then(async (win) => {
          await win.checkPendingRequests(testEmail);
          
          cy.wait('@checkPendingRequests').then((interception) => {
            expect(interception.request.url).to.include(`email=${testEmail}`);
          });
        });
      });
    });
  });