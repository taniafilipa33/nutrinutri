module Api
    class Api::NutritionistsController < ApplicationController
        def index
            @nutritionist = Nutritionist.all
            render json: @nutritionist, include: [:services]
        end

        def show
            render json: @nutritionist, include: [:services]
        end

        def services
            render json: nutritionist.services
        end

        def search
            query = params[:query]
            location = params[:location]
          
            if query.present?
              nutritionists = Nutritionist
                .joins(:services)
                .where("users.name ILIKE :q OR services.name ILIKE :q", q: "%#{query}%")
                .yield_self do |scope|
                  location.present? ? scope.where("services.location ILIKE ?", "%#{location}%") : scope
                end
                .distinct
          
              render json: nutritionists, include: [:services]
            else
              render json: { error: "No query provided" }, status: :bad_request
            end
          end
          
    end
end