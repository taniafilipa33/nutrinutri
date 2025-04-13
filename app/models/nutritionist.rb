class Nutritionist < User
    default_scope { where(type: 'Nutritionist') }
    has_many :services, foreign_key: 'nutritionist_id', inverse_of: :nutritionist
  end