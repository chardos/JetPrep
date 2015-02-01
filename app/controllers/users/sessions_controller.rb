class Users::SessionsController < Devise::SessionsController
  # POST /resource/sign_in
  def create
    cookies[:signed_in] = 1
    super
  end

  # GET /resource/sign_out
  def destroy
    cookies[:signed_in] = 0
    super
  end
end