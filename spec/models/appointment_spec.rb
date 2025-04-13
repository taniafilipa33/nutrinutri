require 'rails_helper'

RSpec.describe Appointment, type: :model do
  it { should belong_to(:guest) }
  it { should belong_to(:service) }

  it { should validate_presence_of(:requested_date) }
  it { should validate_presence_of(:status) }
end