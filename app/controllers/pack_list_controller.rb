class PackListController < ApplicationController
  def index
  end

  def save_to_db
    puts current_user.id
    p = PackList.find_by_user_id(current_user.id)
    p.JSON = 'from controller noob'
    p.save
    puts 'session[:user_id]'
    render text: "Updated details for: #{current_user.email}"
  end
end
