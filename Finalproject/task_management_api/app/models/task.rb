class Task < ApplicationRecord
  belongs_to :user
  has_many :subtasks, dependent: :destroy

  validates :title, presence: true

  before_save :update_status

  private

  def update_status
    self.status = "Completed" if subtasks.all? { |subtask| subtask.status == "Completed" }
  end
end
