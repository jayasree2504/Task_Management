# config/routes.rb

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]   # This will handle user creation (POST /users)
      post 'users/login', to: 'users#login' # This will handle login (POST /users/login)
      resources :tasks, only: [:create, :index, :show, :update, :destroy] do
        resources :subtasks, only: [:create, :index, :show, :update, :destroy]
      end
    end
  end
end
