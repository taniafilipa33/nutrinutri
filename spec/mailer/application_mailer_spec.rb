require "rails_helper"

RSpec.describe ApplicationMailer, type: :mailer do
  describe "#appointment_answered" do
    let(:guest) { Guest.create!(name: "John Doe", email: "john@example.com") }
      let(:nutritionist) { Nutritionist.create!(name: "Dr. Nutri", email: "nutri@example.com") }
  let(:service) { Service.create!(name: "Consultation", price: 50, location: "NYC", nutritionist: nutritionist) }

        timer = Time.now
    let(:appointment) {
        Appointment.create!(
          guest: guest,
          service: service ,
          requested_date: timer,
          status: "accepted"
        )
      }

      let(:mail) { described_class.appointment_answered(appointment) }
      it "renders the headers" do
        expect(mail.subject).to eq("Your appointment has been answered")
        expect(mail.to).to eq(["john@example.com"])
        expect(mail.from).to eq(["no-reply@nutrinutri.com"])
      end
  
      it "includes guest name or appointment info in the body" do
        expect(mail.body.encoded).to include("John")
        expect(mail.body.encoded).to include("accepted") 
      end
  end
end
