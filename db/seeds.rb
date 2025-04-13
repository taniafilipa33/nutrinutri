# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

## tentativa dos nutris
require 'faker'

# Clear existing data
[Service, Appointment, User].each(&:destroy_all)


10.times do
    fake_nutri = Nutritionist.create!(
        name: Faker::Name.name,
        email: Faker::Internet.unique.email
    )
    
    4.times do 
        fake_nutri.services.create!(
            name:Faker::Lorem.sentences(number: 1),
            price: rand(10..500),
            location: Faker::Address.full_address
        )
    end
end 

puts "Created #{Nutritionist.count} nutritionists with #{Service.count} services"

20.times do
    Guest.create!(
      name: Faker::Name.name,
      email: Faker::Internet.unique.email
    )
end

puts "Created #{Guest.count} guests"
