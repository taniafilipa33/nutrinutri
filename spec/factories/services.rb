FactoryBot.define do
  factory :service do
    name { "MyString" }
    price { "9.99" }
    location { "MyString" }
    nutritionist { nil }
  end
end
