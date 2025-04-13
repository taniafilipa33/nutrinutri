class CreateAppointments < ActiveRecord::Migration[7.1]
  def change
    create_table :appointments do |t|
      t.datetime :requested_date
      t.string :status
      t.references :guest, null: false, foreign_key: { to_table: :users}
      t.references :service, null: false, foreign_key: true

      t.timestamps
    end
  end
end
