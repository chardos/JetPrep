class CreatePackLists < ActiveRecord::Migration
  def change
    create_table :pack_lists do |t|
      t.integer "user_id"
      t.string "JSON"
      t.timestamps
    end
  end
end
