class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  
  def index
    tasks = Task.all # Or tasks scoped to the current user, e.g., @current_user.tasks
    render json: tasks
  end
  # Method to authenticate the user based on JWT token in the Authorization header
  def authenticate_user
    token = request.headers["Authorization"]&.split(" ")&.last
    unless token
      render json: { error: "Missing token" }, status: :unauthorized
      return
    end

    begin
      # Use Rails credentials instead of secrets
      decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base).first
      @current_user = User.find(decoded_token["user_id"])
    rescue JWT::DecodeError
      render json: { error: "Invalid token" }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound
      render json: { error: "User not found" }, status: :unauthorized
    end
  end
end

