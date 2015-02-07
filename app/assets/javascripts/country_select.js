var J = J || {};
J.ctrySelect = J.ctrySelect || {};

J.ctrySelect.initSelect2 = function(){
  $(".country-dropdown").select2();
}

J.ctrySelect.selectCountry = function(){
  $('.js-select-country').on('click',function(){
    var selectedCountry = $('.select2-chosen').text();
    $.cookie("countries", selectedCountry );
    window.location.href = "subpage/safety_status";
  })
}

J.ctrySelect.init = function(){
  this.initSelect2();
  this.selectCountry();
}
$(document).on('ready page:load', function () {
  if ( $('#country_select').length > 0 ) {
    J.ctrySelect.init(); 
  };
})




