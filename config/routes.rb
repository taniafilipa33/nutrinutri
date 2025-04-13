Rails.application.routes.draw do
  get 'homepage/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
   get "nutritionists", to: "api/nutritionists#index"
    get "nutritionists/search", to: "api/nutritionists#search"

    get "appointments", to: "api/appointments#index"
    post "appointments", to: "api/appointments#create"
    get "appointments/checkPending", to: "api/appointments#only_one_pending"
    patch "appointments/:id", to: "api/appointments#update"
    get "appointments/search", to: "api/appointments#search"


end
