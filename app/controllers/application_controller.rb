class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :set_logged_in

  def set_logged_in
    puts user_signed_in?
    if cookies[:logged_in] == 'Just registered'
      #do nothing
      puts 'appcontroller: doing nothing'
    elsif user_signed_in?
      cookies[:logged_in] = 1
      puts 'appcontroller: signed in'
      puts cookies[:logged_in]
    else
      cookies[:logged_in] = 0
      puts cookies[:logged_in]
      puts 'appcontroller: not signed in'
    end
  end
end
