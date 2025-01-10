class AddDescriptionToSubtasks < ActiveRecord::Migration[7.2]
  def change
    add_column :subtasks, :description, :string
  end
end
