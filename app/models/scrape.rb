class Scrape < ActiveRecord::Base

  def self.isCountryLink? (scrape, link)
    if scrape == 'safety'
      return true if link['Advice'] != nil #check if url contains 'advice'
      return false
    end

    if scrape == 'vacs'
      return true if link != nil #check if url contains 'advice'
      return false
    end
  end

  def self.safety
    # Scrape all the links into an array
    links = []
    statuses = []
    mech = Mechanize.new
    page = mech.get('http://www.smartraveller.gov.au/zw-cgi/view/Advice/Index')

    page.search('.topicTitle').each do |country| 
      link = country['href']
      if self.isCountryLink?('safety', link)
        links << link
      end
    end

    # Visit each link and scrape data + input into DB

    links.each do |link|
      page = mech.get("http://www.smartraveller.gov.au#{link}")

      country_name = link.split('/').last.titleize
      alert_level_div = page.search('.currentAlertLevel a span')
      puts alert_level_div.length.to_i
      if alert_level_div.length > 0
        alert_level = page.search('.currentAlertLevel a span').first.text #first => show only overall danger level
      else
        alert_level = 'No alert level.'
      end

      country_record = Scrape.find_by_country(country_name)
      if country_record == nil      
        country = Scrape.create(country: country_name, alert_level: alert_level)
      else
        country_record.alert_level = alert_level
        country_record.save
      end

      sleep(6)
    end
  end

  def self.vacs
    links = []

    mech = Mechanize.new
    page = mech.get('http://www.netdoctor.co.uk/travel/vaccines/')

    page.search('#main-content a').each do |country| 
      link = country['href']
      if self.isCountryLink?('vacs', link)
        links << link
      end
    end

    ap links

    links.each do |link|
      page = mech.get("http://www.netdoctor.co.uk#{link}")
      puts link

      country_name = page.search('h1').first.text
      puts country_name

      sleep(6)
    end

  end

end
