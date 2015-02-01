
class Users::RegistrationsController < Devise::RegistrationsController
  def create
    super

    if resource.save
      cookies[:signed_in] = 1
    end
  end
end 

