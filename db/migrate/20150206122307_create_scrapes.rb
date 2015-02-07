class CreateScrapes < ActiveRecord::Migration
  def change
    create_table :scrapes do |t|
      t.string 'country'
      t.string 'alert_level'
      t.timestamps
    end
  end
end
