class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :pack_list

  after_create :create_set_packlist

  def create_set_packlist
    
    #create a packlist
    pl = PackList.create()

    #append to this user
    self.pack_list = pl
  end
end
