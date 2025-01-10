class AddDueDateToSubtasks < ActiveRecord::Migration[7.2]
  def change
    add_column :subtasks, :due_date, :date
  end
end
