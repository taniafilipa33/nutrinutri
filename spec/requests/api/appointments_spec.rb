require 'rails_helper'

RSpec.describe "Api::AppointmentsController", type: :request do
  let!(:guest) { Guest.create!(name: "John Doe", email: "john@example.com") }
  let!(:nutritionist) { Nutritionist.create!(name: "Dr. Nutri", email: "nutri@example.com") }
  let!(:service) { Service.create!(name: "Consultation", price: 50, location: "NYC", nutritionist: nutritionist) }

  describe "GET /appointments" do
    it "returns all appointments" do
      get "/appointments"
      expect(response).to have_http_status(:ok)
    end
  end

  describe "POST /appointments" do
    it "creates a new guest and appointment if guest does not exist" do
      post "/appointments", params: {
        name: "New Guest",
        email: "newguest@example.com",
        requested_date: Time.now,
        service_id: service.id
      }

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body["status"]).to eq("pending")
      expect(Guest.find_by(email: "newguest@example.com")).not_to be_nil
    end

    it "returns an error if appointment is invalid" do
      post "/appointments", params: {
        name: "Invalid Guest",
        email: "invalid@example.com"
        # missing required params
      }

      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body).to have_key("requested_date")
    end
  end

  describe "PATCH /appointments/:id" do
    let!(:timer) { Time.now }
    let!(:appointment) {
      Appointment.create!(
        guest: guest,
        service: service,
        requested_date: timer,
        status: "pending"
      )
    }
    let!(:appointment2) {
      Appointment.create!(
        guest: guest,
        service: service,
        requested_date: timer,
        status: "pending"
      )
    }

    it "rejects other pending appointments and sends mail" do
      mail_double = double("Mail", deliver_later: true)
      expect(ApplicationMailer).to receive(:appointment_answered)
        .with(appointment)
        .and_return(mail_double)

      patch "/appointments/#{appointment.id}",params:{ appointments: { status: "accepted" }}

      expect(response).to have_http_status(:ok)
      expect(appointment.reload.status).to eq("accepted")
      expect(appointment2.reload.status).to eq("rejected")
    end

    it "returns an error if update fails" do
      patch "/appointments/#{appointment.id}", params: {
        appointments: { status: nil }
      }

      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body).to have_key("status")
    end
  end

  describe "GET /appointments/search" do
    it "searches by status" do
      Appointment.create!(guest: guest, service: service, requested_date: Time.now, status: "pending")

      get "/appointments/search", params: { status: "pending" }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to be >= 1
    end

    it "returns an error when no query is provided" do
      get "/appointments/search"
      expect(response).to have_http_status(:bad_request)
      body = JSON.parse(response.body)
      expect(body["error"]).to eq("No query provided")
    end
  end

  describe "GET /appointments/checkPending" do
    it "returns conflict if guest already has pending" do
      Appointment.create!(guest: guest, service: service, requested_date: Time.now, status: "pending")

      get "/appointments/checkPending", params: { email: guest.email }

      expect(response).to have_http_status(:conflict)
    end

    it "returns ok if guest exists but has no pending appointment" do
     
      get "/appointments/checkPending", params: { email: guest.email }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["message"]).to eq("No pending appointment found.")
    end
  end
end
