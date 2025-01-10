class Api::V1::SubtasksController < ApplicationController
    before_action :authenticate_user  # Use your custom authenticate_user method
    
    def create
      @task = Task.find(params[:task_id])
      @subtask = @task.subtasks.new(subtask_params)
    
      if @subtask.save
        render json: { message: 'Subtask successfully created!', subtask: @subtask }, status: :created
      else
        render json: { error: 'Failed to create subtask', details: @subtask.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    private
    
    def subtask_params
      params.require(:subtask).permit(:title, :description, :status, :due_date)
    end
  end
