=begin
class Api::V1::TasksController < ApplicationController
    before_action :authenticate_user!  # Ensure user is authenticated
  
    def create
      task = Task.new(task_params)
      task.user = current_user  # Associate task with the current user
  
      if task.save
        render json: { message: 'Task successfully created!', task: task }, status: :created
      else
        render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def task_params
      params.require(:task).permit(:title, :description, :status, :due_date)
    end
  
    # This method will extract the user from the token
    def authenticate_user!
        auth_header = request.headers['Authorization']
        
        if auth_header.nil?
          render json: { error: 'Missing Authorization header' }, status: :unauthorized
          return
        end
      
        token = auth_header.split(' ').last
        
        begin
          decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base)[0]
          @current_user = User.find(decoded_token['user_id'])
        rescue JWT::DecodeError => e
          render json: { error: 'Unauthorized: ' + e.message }, status: :unauthorized
        end
      end
      
  
    # Current user method to access the authenticated user
    def current_user
      @current_user
    end
  end
=end 
class Api::V1::TasksController < ApplicationController
    before_action :authenticate_user!  # Ensure user is authenticated
  
    def create
      task = Task.new(task_params)
      task.user = current_user  # Associate task with the current user
  
      if task.save
        render json: { message: 'Task successfully created!', task: task }, status: :created
      else
        render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
  
    def task_params
      params.require(:task).permit(:title, :description, :status, :due_date)
    end
  
    # This method will extract the user from the token
    def authenticate_user!
      auth_header = request.headers['Authorization']
  
      if auth_header.nil?
        render json: { error: 'Missing Authorization header' }, status: :unauthorized
        return
      end
  
      token = auth_header.split(' ').last
  
      begin
        # Decode the token and find the user associated with it
        decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base).first
        @current_user = User.find(decoded_token['user_id'])
      rescue JWT::DecodeError => e
        render json: { error: 'Unauthorized: ' + e.message }, status: :unauthorized
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :unauthorized
      end
    end
  
    # Current user method to access the authenticated user
    def current_user
      @current_user
    end
  end
    
  