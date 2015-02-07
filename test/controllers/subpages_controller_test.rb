require 'test_helper'

class SubpagesControllerTest < ActionController::TestCase
  test "should get safety_status" do
    get :safety_status
    assert_response :success
  end

  test "should get vaccinations" do
    get :vaccinations
    assert_response :success
  end

end
