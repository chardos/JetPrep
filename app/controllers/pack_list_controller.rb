class PackListController < ApplicationController
  def index
  end

  def save_to_db
    p = PackList.find_by_user_id(current_user.id)
    p.JSON = params[:list]
    p.save
    render text: "Updated details for: #{current_user.email}"
  end

  def retrieve_from_db
    json = PackList.find_by_user_id(current_user.id).JSON
    render text: json
  end
end
