# app/controllers/api/v1/users_controller.rb

class Api::V1::UsersController < ApplicationController
 
    def create
      user = User.new(user_params)
      if user.save
        render json: { message: 'User successfully created!', token: generate_token(user) }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password]) # Assumes `has_secure_password` is used in User model
      token = JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
      render json: { token: token, user: user }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  
    def generate_token(user)
      JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base)
    end
  end
  
