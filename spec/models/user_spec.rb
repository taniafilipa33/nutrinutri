require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }

  it "can be a Guest or a Nutritionist" do
    guest = User.create!(name: "John", email: "john@example.com", type: "Guest")
    nutritionist = User.create!(name: "Jane", email: "jane@example.com", type: "Nutritionist")

    expect(guest).to be_a(Guest)
    expect(nutritionist).to be_a(Nutritionist)
  end
end

RSpec.describe Guest, type: :model do
  it { should have_many(:appointments) }

  it "inherits from User" do
    expect(described_class < User).to be true
  end
end

RSpec.describe Nutritionist, type: :model do
  it { should have_many(:services) }

  it "inherits from User" do
    expect(described_class < User).to be true
  end
end