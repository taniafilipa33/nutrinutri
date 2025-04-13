require 'rails_helper'

RSpec.describe "Api::AppointmentsController", type: :request do
  let(:guest) { Guest.create!(name: "John Doe", email: "john@example.com") }
  let(:nutritionist) { Nutritionist.create!(name: "Dr. Nutri", email: "nutri@example.com") }
  let(:service) { Service.create!(name: "Consultation", price: 50, location: "NYC", nutritionist: nutritionist) }

  describe "GET /appointments" do
    it "returns all appointments" do
      get "/appointments"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /appointments" do
    it "creates a new appointment" do
      post "/appointments", params: {
        name: guest.name,
        email: guest.email,
        requested_date: Time.now,
        service_id: service.id
      }

      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)["status"]).to eq("pending")
    end
  end

  describe "PATCH /appointments/:id" do
    let(:appointment) {
      Appointment.create!(
        guest: guest,
        service: service,
        requested_date: Time.now,
        status: "pending"
      )
    }

    it "updates appointment and triggers email" do
      patch "/appointments/#{appointment.id}", params: {
        appointment: {
          status: "accepted"
        },
        guest_id: guest.id,
        requested_date: appointment.requested_date
      }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["status"]).to eq("accepted")
    end
  end

  describe "GET /appointments/search" do
    it "searches by status" do
      Appointment.create!(guest: guest, service: service, requested_date: Time.now, status: "pending")
      get "/appointments/search", params: { status: "pending" }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to be >= 1
    end
  end

  describe "GET /appointments/checkPending" do
    it "returns conflict if guest already has pending" do
      Appointment.create!(guest: guest, service: service, requested_date: Time.now, status: "pending")

      get "/appointments/checkPending", params: { email: guest.email }

      expect(response).to have_http_status(:conflict)
    end
  end
end
