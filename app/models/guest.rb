class Guest < User
    default_scope { where(type: 'Guest') }
    has_many :appointments, foreign_key: 'guest_id', inverse_of: :guest
  end
  
  