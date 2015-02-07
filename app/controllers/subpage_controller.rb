class SubpageController < ApplicationController
  def safety_status
    @selectedCountry = cookies[:countries]
    @selectedCountryStatus = Scrape.find_by_country(@selectedCountry).alert_level
  end

  def vaccinations
  end

  def country_select
  end
end
