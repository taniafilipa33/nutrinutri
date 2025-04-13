require 'rails_helper'

RSpec.describe "Api::NutritionistsController", type: :request do
  let!(:nutritionist) { Nutritionist.create!(name: "Dr. Nutri", email: "nutri@example.com") }
  let!(:service) { Service.create!(name: "Meal Plan", price: 30, location: "Remote", nutritionist: nutritionist) }

  describe "GET /nutritionists" do
    it "returns all nutritionists with their services" do
      get "/nutritionists"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).first["services"]).not_to be_empty
    end
  end

  describe "GET /nutritionists/search" do
    it "returns matching nutritionists by name or service" do
      get "/nutritionists/search", params: { query: "Meal" }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).length).to be >= 1
    end

    it "returns 400 if query is missing" do
      get "/nutritionists/search"
      expect(response).to have_http_status(:bad_request)
    end
  end
end
