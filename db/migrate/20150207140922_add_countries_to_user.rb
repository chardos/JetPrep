class AddCountriesToUser < ActiveRecord::Migration
  def change
    add_column :users, :countries, :string
    add_column :users, :pack_list, :string
  end
end
