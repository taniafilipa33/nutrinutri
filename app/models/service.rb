class Service < ApplicationRecord
  belongs_to :nutritionist, class_name: 'Nutritionist', foreign_key: 'nutritionist_id'
  has_many :appointments

  validates :name, presence: true
  validates :price, presence: true
end
