class ApplicationMailer < ActionMailer::Base
  default from: 'no-reply@nutrinutri.com'

  def appointment_answered(appointment)
    @appointment = appointment
    @guest = appointment.guest
    mail(to: @guest.email, subject: 'Your appointment has been answered')
  end


end
