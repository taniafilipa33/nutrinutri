class User < ApplicationRecord
  # Enable STI
  self.inheritance_column = :type

  validates :name, presence: true
  validates :email, presence: true
end



