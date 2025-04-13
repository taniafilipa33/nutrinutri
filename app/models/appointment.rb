class Appointment < ApplicationRecord
  belongs_to :guest
  belongs_to :service

  validates :requested_date, presence: true
  validates :status, presence: true
end
