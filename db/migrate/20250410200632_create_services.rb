class CreateServices < ActiveRecord::Migration[7.1]
  def change
    create_table :services do |t|
      t.string :name
      t.decimal :price
      t.string :location
      t.references :nutritionist, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
