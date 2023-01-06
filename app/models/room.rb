class Room < ApplicationRecord
  validates_uniqueness_of :name
  scope :public_rooms, -> { where(is_private: false) }
  scope :private_rooms, -> { where(is_private: true) }
end
