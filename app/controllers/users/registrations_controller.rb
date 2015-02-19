
class Users::RegistrationsController < Devise::RegistrationsController
  
  def create
    super
    if resource.save
      cookies[:logged_in] = 'Just registered'
    end
  end

end 

